import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_list_campaigns():
    response = client.get("/campaigns/")
    assert response.status_code == 200


def test_create_campaign():
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
    assert response.status_code in [200, 201]


def test_get_campaign():
    response = client.get("/campaigns/1")
    assert response.status_code in [200, 404]


def test_update_campaign():
    response = client.put("/campaigns/1", json={"name": "Updated Campaign"})
    assert response.status_code in [200, 404]


def test_delete_campaign():
    response = client.delete("/campaigns/1")
    assert response.status_code in [200, 204, 404]