from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional
from datetime import datetime


class User(BaseModel):
    id: int
    email: EmailStr
    full_name: str
    role: str
    is_active: bool


class UserCreate(BaseModel):
    email: EmailStr
    full_name: str
    password: str
    role: str


class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    password: Optional[str] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None


class Token(BaseModel):
    access_token: str
    token_type: str


class Campaign(BaseModel):
    id: int
    name: str
    description: str
    status: str
    start_date: datetime
    end_date: datetime
    budget: float
    roi: float
    owner_id: int


class CampaignCreate(BaseModel):
    name: str
    description: str
    status: str
    start_date: datetime
    end_date: datetime
    budget: float
    roi: float
    owner_id: int


class CampaignUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    budget: Optional[float] = None
    roi: Optional[float] = None
    owner_id: Optional[int] = None


class Task(BaseModel):
    id: int
    title: str
    description: str
    status: str
    due_date: datetime
    assigned_to: int
    campaign_id: int


class TaskCreate(BaseModel):
    title: str
    description: str
    status: str
    due_date: datetime
    assigned_to: int
    campaign_id: int


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None
    due_date: Optional[datetime] = None
    assigned_to: Optional[int] = None
    campaign_id: Optional[int] = None


class Metric(BaseModel):
    id: int
    campaign_id: int
    name: str
    value: float
    timestamp: datetime


class MetricCreate(BaseModel):
    campaign_id: int
    name: str
    value: float
    timestamp: datetime


class Report(BaseModel):
    id: int
    campaign_id: int
    generated_at: datetime
    url: str


class ReportCreate(BaseModel):
    campaign_id: int
    url: str