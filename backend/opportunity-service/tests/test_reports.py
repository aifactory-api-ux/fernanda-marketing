import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_list_reports():
    response = client.get("/reports/")
    assert response.status_code == 200


def test_list_reports_by_campaign():
    response = client.get("/reports/?campaign_id=1")
    assert response.status_code == 200


def test_create_report():
    response = client.post("/reports/", json={
        "campaign_id": 1,
        "url": "https://example.com/report.pdf"
    })
    assert response.status_code in [200, 201]