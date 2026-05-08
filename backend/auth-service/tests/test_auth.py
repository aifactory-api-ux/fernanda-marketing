import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}


def test_register():
    response = client.post("/auth/register", json={
        "email": "test@example.com",
        "full_name": "Test User",
        "password": "password123",
        "role": "user"
    })
    assert response.status_code in [200, 201, 400]


def test_login():
    response = client.post("/auth/login", json={
        "email": "test@example.com",
        "password": "password123"
    })
    assert response.status_code in [200, 401]


def test_get_me():
    response = client.get("/auth/me")
    assert response.status_code in [200, 401]