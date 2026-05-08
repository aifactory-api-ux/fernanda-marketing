import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_list_users():
    response = client.get("/users/")
    assert response.status_code in [200, 401]


def test_get_user():
    response = client.get("/users/1")
    assert response.status_code in [200, 404, 401]


def test_update_user():
    response = client.put("/users/1", json={"full_name": "Updated Name"})
    assert response.status_code in [200, 404, 401]


def test_delete_user():
    response = client.delete("/users/1")
    assert response.status_code in [200, 204, 404, 401]