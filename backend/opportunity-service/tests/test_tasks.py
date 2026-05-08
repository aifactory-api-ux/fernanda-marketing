import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_list_tasks():
    response = client.get("/tasks/")
    assert response.status_code == 200


def test_create_task():
    response = client.post("/tasks/", json={
        "title": "Test Task",
        "description": "Test description",
        "status": "pending",
        "due_date": "2024-12-31T00:00:00",
        "assigned_to": 1,
        "campaign_id": 1
    })
    assert response.status_code in [200, 201]


def test_get_task():
    response = client.get("/tasks/1")
    assert response.status_code in [200, 404]


def test_update_task():
    response = client.put("/tasks/1", json={"title": "Updated Task"})
    assert response.status_code in [200, 404]


def test_delete_task():
    response = client.delete("/tasks/1")
    assert response.status_code in [200, 204, 404]