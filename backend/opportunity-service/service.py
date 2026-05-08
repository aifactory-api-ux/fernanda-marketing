from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import Session
import sys
import os
from datetime import datetime

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from shared.db import Base


class CampaignModel(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(String)
    status = Column(String, default="active")
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    budget = Column(Float, default=0.0)
    roi = Column(Float, default=0.0)
    owner_id = Column(Integer, ForeignKey("users.id"))


class TaskModel(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String)
    status = Column(String, default="pending")
    due_date = Column(DateTime, nullable=False)
    assigned_to = Column(Integer, ForeignKey("users.id"))
    campaign_id = Column(Integer, ForeignKey("campaigns.id"))


class MetricModel(Base):
    __tablename__ = "metrics"

    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id"))
    name = Column(String, nullable=False)
    value = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)


class ReportModel(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    campaign_id = Column(Integer, ForeignKey("campaigns.id"))
    generated_at = Column(DateTime, default=datetime.utcnow)
    url = Column(String)


class OpportunityService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_campaigns(self):
        return self.db.query(CampaignModel).all()

    def get_campaign_by_id(self, campaign_id: int):
        return self.db.query(CampaignModel).filter(CampaignModel.id == campaign_id).first()

    def create_campaign(self, campaign_data):
        db_campaign = CampaignModel(
            name=campaign_data.name,
            description=campaign_data.description,
            status=campaign_data.status,
            start_date=campaign_data.start_date,
            end_date=campaign_data.end_date,
            budget=campaign_data.budget,
            roi=campaign_data.roi,
            owner_id=campaign_data.owner_id
        )
        self.db.add(db_campaign)
        self.db.commit()
        self.db.refresh(db_campaign)
        return db_campaign

    def update_campaign(self, campaign_id: int, campaign_data):
        campaign = self.get_campaign_by_id(campaign_id)
        if not campaign:
            return None

        update_data = campaign_data.dict(exclude_unset=True)
        for key, value in update_data.items():
            if hasattr(campaign, key):
                setattr(campaign, key, value)

        self.db.commit()
        self.db.refresh(campaign)
        return campaign

    def delete_campaign(self, campaign_id: int) -> bool:
        campaign = self.get_campaign_by_id(campaign_id)
        if not campaign:
            return False
        self.db.delete(campaign)
        self.db.commit()
        return True

    def get_all_tasks(self):
        return self.db.query(TaskModel).all()

    def get_task_by_id(self, task_id: int):
        return self.db.query(TaskModel).filter(TaskModel.id == task_id).first()

    def create_task(self, task_data):
        db_task = TaskModel(
            title=task_data.title,
            description=task_data.description,
            status=task_data.status,
            due_date=task_data.due_date,
            assigned_to=task_data.assigned_to,
            campaign_id=task_data.campaign_id
        )
        self.db.add(db_task)
        self.db.commit()
        self.db.refresh(db_task)
        return db_task

    def update_task(self, task_id: int, task_data):
        task = self.get_task_by_id(task_id)
        if not task:
            return None

        update_data = task_data.dict(exclude_unset=True)
        for key, value in update_data.items():
            if hasattr(task, key):
                setattr(task, key, value)

        self.db.commit()
        self.db.refresh(task)
        return task

    def delete_task(self, task_id: int) -> bool:
        task = self.get_task_by_id(task_id)
        if not task:
            return False
        self.db.delete(task)
        self.db.commit()
        return True

    def get_metrics_by_campaign(self, campaign_id: int):
        return self.db.query(MetricModel).filter(MetricModel.campaign_id == campaign_id).all()

    def create_metric(self, metric_data):
        db_metric = MetricModel(
            campaign_id=metric_data.campaign_id,
            name=metric_data.name,
            value=metric_data.value,
            timestamp=metric_data.timestamp
        )
        self.db.add(db_metric)
        self.db.commit()
        self.db.refresh(db_metric)
        return db_metric

    def get_reports_by_campaign(self, campaign_id: int):
        return self.db.query(ReportModel).filter(ReportModel.campaign_id == campaign_id).all()

    def create_report(self, report_data):
        db_report = ReportModel(
            campaign_id=report_data.campaign_id,
            url=report_data.url
        )
        self.db.add(db_report)
        self.db.commit()
        self.db.refresh(db_report)
        return db_report