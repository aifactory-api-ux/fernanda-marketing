from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from datetime import timedelta
import os

import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from shared.models import User, UserCreate, UserUpdate, Token
from shared.db import get_db
from shared.auth import create_access_token, verify_password, decode_token
from service import AuthService

router = APIRouter()


def get_auth_service(db: Session = Depends(get_db)) -> AuthService:
    return AuthService(db)


@router.post("/auth/login", response_model=Token)
def login(user_data: dict, service: AuthService = Depends(get_auth_service)):
    email = user_data.get("email")
    password = user_data.get("password")
    if not email or not password:
        raise HTTPException(status_code=400, detail="Email and password are required")

    user = service.get_user_by_email(email)
    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token_expires = timedelta(minutes=int(os.getenv("AUTH_ACCESS_TOKEN_EXPIRE", "60")))
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email, "role": user.role},
        secret=os.getenv("AUTH_JWT_SECRET"),
        expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}


@router.post("/auth/register", response_model=User)
def register(user_data: UserCreate, service: AuthService = Depends(get_auth_service)):
    existing = service.get_user_by_email(user_data.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    new_user = service.create_user(user_data)
    return new_user


@router.get("/auth/me", response_model=User)
def get_current_user(authorization: str = None, service: AuthService = Depends(get_auth_service)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing or invalid authorization header")

    token = authorization.split(" ")[1]
    payload = decode_token(token, os.getenv("AUTH_JWT_SECRET"))
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user_id = int(payload.get("sub"))
    user = service.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user


@router.get("/users/", response_model=list[User])
def list_users(service: AuthService = Depends(get_auth_service)):
    return service.get_all_users()


@router.get("/users/{user_id}", response_model=User)
def get_user(user_id: int, service: AuthService = Depends(get_auth_service)):
    user = service.get_user_by_id(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.put("/users/{user_id}", response_model=User)
def update_user(user_id: int, user_data: UserUpdate, service: AuthService = Depends(get_auth_service)):
    user = service.update_user(user_id, user_data)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.delete("/users/{user_id}")
def delete_user(user_id: int, service: AuthService = Depends(get_auth_service)):
    success = service.delete_user(user_id)
    if not success:
        raise HTTPException(status_code=404, detail="User not found")
    return {"detail": "User deleted successfully"}