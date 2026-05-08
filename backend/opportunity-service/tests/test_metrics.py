import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_list_metrics():
    response = client.get("/metrics/")
    assert response.status_code == 200


def test_list_metrics_by_campaign():
    response = client.get("/metrics/?campaign_id=1")
    assert response.status_code == 200


def test_create_metric():
    response = client.post("/metrics/", json={
        "campaign_id": 1,
        "name": "Impressions",
        "value": 10000.0,
        "timestamp": "2024-01-01T00:00:00"
    })
    assert response.status_code in [200, 201]