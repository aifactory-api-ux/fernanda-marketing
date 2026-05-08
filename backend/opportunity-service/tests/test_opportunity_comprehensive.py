import os
os.environ['OPPORTUNITY_DB_URL'] = 'sqlite:///./test_opportunity.db'

import sys
_current_file = os.path.abspath(__file__)
_backend_dir = os.path.dirname(os.path.dirname(os.path.dirname(_current_file)))
_frontend_dir = os.path.dirname(_backend_dir)
_workspace_dir = os.path.dirname(_frontend_dir)
sys.path.insert(0, _backend_dir)
sys.path.insert(0, os.path.join(_backend_dir, "shared"))

import pytest
from sqlalchemy import create_engine, Table, Column, Integer, String, MetaData, ForeignKey
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from unittest.mock import patch

from shared.db import Base, get_db

engine = create_engine('sqlite://', connect_args={'check_same_thread': False}, poolclass=StaticPool)
TestingSession = sessionmaker(bind=engine)

metadata = MetaData()
users_table = Table('users', metadata,
    Column('id', Integer, primary_key=True, index=True),
    Column('email', String, unique=True, index=True, nullable=False),
    Column('password_hash', String, nullable=False),
    Column('full_name', String, nullable=False),
    Column('role', String, default="user"),
    Column('is_active', Integer, default=True)
)
metadata.create_all(bind=engine)

with patch('shared.db.Base') as mock_base:
    mock_base.metadata.create_all = lambda **kwargs: None
    from main import app


@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def client():
    def override_db():
        db = TestingSession()
        try:
            yield db
        finally:
            db.close()
    app.dependency_overrides[get_db] = override_db
    with TestClient(app) as c:
        yield c
    app.dependency_overrides.clear()


@pytest.fixture
def db_session():
    db = TestingSession()
    try:
        yield db
    finally:
        db.close()


class TestHealth:
    def test_health(self, client):
        response = client.get("/health")
        assert response.status_code == 200
        assert response.json() == {"status": "healthy"}


class TestCampaignsList:
    def test_list_campaigns_empty(self, client):
        response = client.get("/campaigns/")
        assert response.status_code == 200
        assert response.json() == []

    def test_list_campaigns_with_data(self, client):
        client.post("/campaigns/", json={
            "name": "Campaign 1",
            "description": "Description 1",
            "status": "active",
            "start_date": "2024-01-01T00:00:00",
            "end_date": "2024-12-31T00:00:00",
            "budget": 10000.0,
            "roi": 0.0,
            "owner_id": 1
        })
        client.post("/campaigns/", json={
            "name": "Campaign 2",
            "description": "Description 2",
            "status": "inactive",
            "start_date": "2024-01-01T00:00:00",
            "end_date": "2024-12-31T00:00:00",
            "budget": 20000.0,
            "roi": 0.0,
            "owner_id": 1
        })
        response = client.get("/campaigns/")
        assert response.status_code == 200
        campaigns = response.json()
        assert len(campaigns) == 2


class TestCampaignCreate:
    def test_create_campaign_success(self, client):
        response = client.post("/campaigns/", json={
            "name": "Test Campaign",
            "description": "Test description",
            "status": "active",
            "start_date": "2024-01-01T00:00:00",
            "end_date": "2024-12-31T00:00:00",
            "budget": 10000.0,
            "roi": 0.0,
            "owner_id": 1
        })
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Test Campaign"
        assert data["status"] == "active"
        assert data["budget"] == 10000.0

    def test_create_campaign_minimal(self, client):
        response = client.post("/campaigns/", json={
            "name": "Minimal Campaign",
            "description": "",
            "status": "draft",
            "start_date": "2024-01-01T00:00:00",
            "end_date": "2024-12-31T00:00:00",
            "budget": 0.0,
            "roi": 0.0,
            "owner_id": 1
        })
        assert response.status_code == 200


class TestCampaignGet:
    def test_get_campaign_success(self, client):
        create_response = client.post("/campaigns/", json={
            "name": "Test Campaign",
            "description": "Test description",
            "status": "active",
            "start_date": "2024-01-01T00:00:00",
            "end_date": "2024-12-31T00:00:00",
            "budget": 10000.0,
            "roi": 0.0,
            "owner_id": 1
        })
        campaign_id = create_response.json()["id"]

        response = client.get(f"/campaigns/{campaign_id}")
        assert response.status_code == 200
        assert response.json()["name"] == "Test Campaign"

    def test_get_campaign_not_found(self, client):
        response = client.get("/campaigns/99999")
        assert response.status_code == 404
        assert "not found" in response.json()["detail"]


class TestCampaignUpdate:
    def test_update_campaign_success(self, client):
        create_response = client.post("/campaigns/", json={
            "name": "Test Campaign",
            "description": "Test description",
            "status": "active",
            "start_date": "2024-01-01T00:00:00",
            "end_date": "2024-12-31T00:00:00",
            "budget": 10000.0,
            "roi": 0.0,
            "owner_id": 1
        })
        campaign_id = create_response.json()["id"]

        response = client.put(f"/campaigns/{campaign_id}", json={"name": "Updated Campaign"})
        assert response.status_code == 200
        assert response.json()["name"] == "Updated Campaign"

    def test_update_campaign_status(self, client):
        create_response = client.post("/campaigns/", json={
            "name": "Test Campaign",
            "description": "Test description",
            "status": "active",
            "start_date": "2024-01-01T00:00:00",
            "end_date": "2024-12-31T00:00:00",
            "budget": 10000.0,
            "roi": 0.0,
            "owner_id": 1
        })
        campaign_id = create_response.json()["id"]

        response = client.put(f"/campaigns/{campaign_id}", json={"status": "completed"})
        assert response.status_code == 200
        assert response.json()["status"] == "completed"

    def test_update_campaign_not_found(self, client):
        response = client.put("/campaigns/99999", json={"name": "Updated"})
        assert response.status_code == 404


class TestCampaignDelete:
    def test_delete_campaign_success(self, client):
        create_response = client.post("/campaigns/", json={
            "name": "Test Campaign",
            "description": "Test description",
            "status": "active",
            "start_date": "2024-01-01T00:00:00",
            "end_date": "2024-12-31T00:00:00",
            "budget": 10000.0,
            "roi": 0.0,
            "owner_id": 1
        })
        campaign_id = create_response.json()["id"]

        response = client.delete(f"/campaigns/{campaign_id}")
        assert response.status_code == 200
        assert "deleted successfully" in response.json()["detail"]

        get_response = client.get(f"/campaigns/{campaign_id}")
        assert get_response.status_code == 404

    def test_delete_campaign_not_found(self, client):
        response = client.delete("/campaigns/99999")
        assert response.status_code == 404


class TestTasksList:
    def test_list_tasks_empty(self, client):
        response = client.get("/tasks/")
        assert response.status_code == 200
        assert response.json() == []

    def test_list_tasks_with_data(self, client):
        client.post("/tasks/", json={
            "title": "Task 1",
            "description": "Description 1",
            "status": "pending",
            "due_date": "2024-12-31T00:00:00",
            "assigned_to": 1,
            "campaign_id": 1
        })
        response = client.get("/tasks/")
        assert response.status_code == 200
        tasks = response.json()
        assert len(tasks) == 1


class TestTaskCreate:
    def test_create_task_success(self, client):
        response = client.post("/tasks/", json={
            "title": "Test Task",
            "description": "Test description",
            "status": "pending",
            "due_date": "2024-12-31T00:00:00",
            "assigned_to": 1,
            "campaign_id": 1
        })
        assert response.status_code == 200
        data = response.json()
        assert data["title"] == "Test Task"
        assert data["status"] == "pending"


class TestTaskGet:
    def test_get_task_success(self, client):
        create_response = client.post("/tasks/", json={
            "title": "Test Task",
            "description": "Test description",
            "status": "pending",
            "due_date": "2024-12-31T00:00:00",
            "assigned_to": 1,
            "campaign_id": 1
        })
        task_id = create_response.json()["id"]

        response = client.get(f"/tasks/{task_id}")
        assert response.status_code == 200
        assert response.json()["title"] == "Test Task"

    def test_get_task_not_found(self, client):
        response = client.get("/tasks/99999")
        assert response.status_code == 404


class TestTaskUpdate:
    def test_update_task_success(self, client):
        create_response = client.post("/tasks/", json={
            "title": "Test Task",
            "description": "Test description",
            "status": "pending",
            "due_date": "2024-12-31T00:00:00",
            "assigned_to": 1,
            "campaign_id": 1
        })
        task_id = create_response.json()["id"]

        response = client.put(f"/tasks/{task_id}", json={"title": "Updated Task"})
        assert response.status_code == 200
        assert response.json()["title"] == "Updated Task"

    def test_update_task_status(self, client):
        create_response = client.post("/tasks/", json={
            "title": "Test Task",
            "description": "Test description",
            "status": "pending",
            "due_date": "2024-12-31T00:00:00",
            "assigned_to": 1,
            "campaign_id": 1
        })
        task_id = create_response.json()["id"]

        response = client.put(f"/tasks/{task_id}", json={"status": "completed"})
        assert response.status_code == 200
        assert response.json()["status"] == "completed"

    def test_update_task_not_found(self, client):
        response = client.put("/tasks/99999", json={"title": "Updated"})
        assert response.status_code == 404


class TestTaskDelete:
    def test_delete_task_success(self, client):
        create_response = client.post("/tasks/", json={
            "title": "Test Task",
            "description": "Test description",
            "status": "pending",
            "due_date": "2024-12-31T00:00:00",
            "assigned_to": 1,
            "campaign_id": 1
        })
        task_id = create_response.json()["id"]

        response = client.delete(f"/tasks/{task_id}")
        assert response.status_code == 200
        assert "deleted successfully" in response.json()["detail"]

        get_response = client.get(f"/tasks/{task_id}")
        assert get_response.status_code == 404

    def test_delete_task_not_found(self, client):
        response = client.delete("/tasks/99999")
        assert response.status_code == 404


class TestMetricsList:
    def test_list_metrics_empty(self, client):
        response = client.get("/metrics/")
        assert response.status_code == 200
        assert response.json() == []

    def test_list_metrics_no_campaign_id(self, client):
        response = client.get("/metrics/")
        assert response.status_code == 200
        assert response.json() == []

    def test_list_metrics_by_campaign(self, client):
        campaign_response = client.post("/campaigns/", json={
            "name": "Test Campaign",
            "description": "Test description",
            "status": "active",
            "start_date": "2024-01-01T00:00:00",
            "end_date": "2024-12-31T00:00:00",
            "budget": 10000.0,
            "roi": 0.0,
            "owner_id": 1
        })
        campaign_id = campaign_response.json()["id"]

        client.post("/metrics/", json={
            "campaign_id": campaign_id,
            "name": "Impressions",
            "value": 10000.0,
            "timestamp": "2024-01-01T00:00:00"
        })
        response = client.get(f"/metrics/?campaign_id={campaign_id}")
        assert response.status_code == 200
        metrics = response.json()
        assert len(metrics) == 1


class TestMetricCreate:
    def test_create_metric_success(self, client):
        campaign_response = client.post("/campaigns/", json={
            "name": "Test Campaign",
            "description": "Test description",
            "status": "active",
            "start_date": "2024-01-01T00:00:00",
            "end_date": "2024-12-31T00:00:00",
            "budget": 10000.0,
            "roi": 0.0,
            "owner_id": 1
        })
        campaign_id = campaign_response.json()["id"]

        response = client.post("/metrics/", json={
            "campaign_id": campaign_id,
            "name": "Impressions",
            "value": 10000.0,
            "timestamp": "2024-01-01T00:00:00"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "Impressions"
        assert data["value"] == 10000.0


class TestReportsList:
    def test_list_reports_empty(self, client):
        response = client.get("/reports/")
        assert response.status_code == 200
        assert response.json() == []

    def test_list_reports_no_campaign_id(self, client):
        response = client.get("/reports/")
        assert response.status_code == 200
        assert response.json() == []

    def test_list_reports_by_campaign(self, client):
        campaign_response = client.post("/campaigns/", json={
            "name": "Test Campaign",
            "description": "Test description",
            "status": "active",
            "start_date": "2024-01-01T00:00:00",
            "end_date": "2024-12-31T00:00:00",
            "budget": 10000.0,
            "roi": 0.0,
            "owner_id": 1
        })
        campaign_id = campaign_response.json()["id"]

        client.post("/reports/", json={
            "campaign_id": campaign_id,
            "url": "https://example.com/report.pdf"
        })
        response = client.get(f"/reports/?campaign_id={campaign_id}")
        assert response.status_code == 200
        reports = response.json()
        assert len(reports) == 1


class TestReportCreate:
    def test_create_report_success(self, client):
        campaign_response = client.post("/campaigns/", json={
            "name": "Test Campaign",
            "description": "Test description",
            "status": "active",
            "start_date": "2024-01-01T00:00:00",
            "end_date": "2024-12-31T00:00:00",
            "budget": 10000.0,
            "roi": 0.0,
            "owner_id": 1
        })
        campaign_id = campaign_response.json()["id"]

        response = client.post("/reports/", json={
            "campaign_id": campaign_id,
            "url": "https://example.com/report.pdf"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["url"] == "https://example.com/report.pdf"
        assert "id" in data