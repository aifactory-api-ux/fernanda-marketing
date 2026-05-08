import os
os.environ['AUTH_DB_URL'] = 'sqlite:///./test_auth.db'

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from main import app
from shared.db import Base, get_db
from service import UserModel

engine = create_engine('sqlite://', connect_args={'check_same_thread': False}, poolclass=StaticPool)
TestingSession = sessionmaker(bind=engine)


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


class TestAuthRegister:
    def test_register_success(self, client):
        response = client.post("/auth/register", json={
            "email": "test@example.com",
            "full_name": "Test User",
            "password": "password123",
            "role": "user"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == "test@example.com"
        assert data["full_name"] == "Test User"
        assert data["role"] == "user"
        assert "id" in data
        assert "password_hash" not in data

    def test_register_duplicate_email(self, client):
        client.post("/auth/register", json={
            "email": "test@example.com",
            "full_name": "Test User",
            "password": "password123",
            "role": "user"
        })
        response = client.post("/auth/register", json={
            "email": "test@example.com",
            "full_name": "Another User",
            "password": "password456",
            "role": "user"
        })
        assert response.status_code == 400
        assert "already registered" in response.json()["detail"]

    def test_register_invalid_email(self, client):
        response = client.post("/auth/register", json={
            "email": "not-an-email",
            "full_name": "Test User",
            "password": "password123",
            "role": "user"
        })
        assert response.status_code == 422


class TestAuthLogin:
    def test_login_success(self, client):
        client.post("/auth/register", json={
            "email": "test@example.com",
            "full_name": "Test User",
            "password": "password123",
            "role": "user"
        })
        response = client.post("/auth/login", json={
            "email": "test@example.com",
            "password": "password123"
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["token_type"] == "bearer"

    def test_login_wrong_password(self, client):
        client.post("/auth/register", json={
            "email": "test@example.com",
            "full_name": "Test User",
            "password": "password123",
            "role": "user"
        })
        response = client.post("/auth/login", json={
            "email": "test@example.com",
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        assert "Invalid credentials" in response.json()["detail"]

    def test_login_nonexistent_user(self, client):
        response = client.post("/auth/login", json={
            "email": "nonexistent@example.com",
            "password": "password123"
        })
        assert response.status_code == 401
        assert "Invalid credentials" in response.json()["detail"]

    def test_login_missing_fields(self, client):
        response = client.post("/auth/login", json={
            "email": "test@example.com"
        })
        assert response.status_code == 400
        assert "required" in response.json()["detail"]

    def test_login_empty_body(self, client):
        response = client.post("/auth/login", json={})
        assert response.status_code == 400


class TestAuthMe:
    def test_get_me_success(self, client):
        register_response = client.post("/auth/register", json={
            "email": "test@example.com",
            "full_name": "Test User",
            "password": "password123",
            "role": "user"
        })
        user_id = register_response.json()["id"]

        login_response = client.post("/auth/login", json={
            "email": "test@example.com",
            "password": "password123"
        })
        token = login_response.json()["access_token"]

        response = client.get("/auth/me", headers={"Authorization": f"Bearer {token}"})
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == user_id
        assert data["email"] == "test@example.com"

    def test_get_me_no_token(self, client):
        response = client.get("/auth/me")
        assert response.status_code == 401
        assert "Missing or invalid" in response.json()["detail"]

    def test_get_me_invalid_token(self, client):
        response = client.get("/auth/me", headers={"Authorization": "Bearer invalid_token"})
        assert response.status_code == 401
        assert "Invalid or expired token" in response.json()["detail"]

    def test_get_me_malformed_header(self, client):
        response = client.get("/auth/me", headers={"Authorization": "invalid_header"})
        assert response.status_code == 401


class TestUsersList:
    def test_list_users_empty(self, client):
        response = client.get("/users/")
        assert response.status_code == 200
        assert response.json() == []

    def test_list_users_with_data(self, client):
        client.post("/auth/register", json={
            "email": "user1@example.com",
            "full_name": "User One",
            "password": "password123",
            "role": "user"
        })
        client.post("/auth/register", json={
            "email": "user2@example.com",
            "full_name": "User Two",
            "password": "password123",
            "role": "admin"
        })
        response = client.get("/users/")
        assert response.status_code == 200
        users = response.json()
        assert len(users) == 2


class TestUserGet:
    def test_get_user_success(self, client):
        register_response = client.post("/auth/register", json={
            "email": "test@example.com",
            "full_name": "Test User",
            "password": "password123",
            "role": "user"
        })
        user_id = register_response.json()["id"]

        response = client.get(f"/users/{user_id}")
        assert response.status_code == 200
        assert response.json()["email"] == "test@example.com"

    def test_get_user_not_found(self, client):
        response = client.get("/users/99999")
        assert response.status_code == 404
        assert "not found" in response.json()["detail"]


class TestUserUpdate:
    def test_update_user_success(self, client):
        register_response = client.post("/auth/register", json={
            "email": "test@example.com",
            "full_name": "Test User",
            "password": "password123",
            "role": "user"
        })
        user_id = register_response.json()["id"]

        response = client.put(f"/users/{user_id}", json={"full_name": "Updated Name"})
        assert response.status_code == 200
        assert response.json()["full_name"] == "Updated Name"

    def test_update_user_not_found(self, client):
        response = client.put("/users/99999", json={"full_name": "Updated Name"})
        assert response.status_code == 404

    def test_update_user_password(self, client):
        register_response = client.post("/auth/register", json={
            "email": "test@example.com",
            "full_name": "Test User",
            "password": "password123",
            "role": "user"
        })
        user_id = register_response.json()["id"]

        response = client.put(f"/users/{user_id}", json={"password": "newpassword123"})
        assert response.status_code == 200

        login_response = client.post("/auth/login", json={
            "email": "test@example.com",
            "password": "newpassword123"
        })
        assert login_response.status_code == 200


class TestUserDelete:
    def test_delete_user_success(self, client):
        register_response = client.post("/auth/register", json={
            "email": "test@example.com",
            "full_name": "Test User",
            "password": "password123",
            "role": "user"
        })
        user_id = register_response.json()["id"]

        response = client.delete(f"/users/{user_id}")
        assert response.status_code == 200
        assert "deleted successfully" in response.json()["detail"]

        get_response = client.get(f"/users/{user_id}")
        assert get_response.status_code == 404

    def test_delete_user_not_found(self, client):
        response = client.delete("/users/99999")
        assert response.status_code == 404