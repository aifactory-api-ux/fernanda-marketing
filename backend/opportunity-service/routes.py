from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from shared.models import (
    Campaign, CampaignCreate, CampaignUpdate,
    Task, TaskCreate, TaskUpdate,
    Metric, MetricCreate,
    Report, ReportCreate
)
from shared.db import get_db
from service import OpportunityService

router = APIRouter()


def get_opportunity_service(db: Session = Depends(get_db)) -> OpportunityService:
    return OpportunityService(db)


@router.get("/campaigns/", response_model=list[Campaign])
def list_campaigns(service: OpportunityService = Depends(get_opportunity_service)):
    return service.get_all_campaigns()


@router.post("/campaigns/", response_model=Campaign)
def create_campaign(campaign_data: CampaignCreate, service: OpportunityService = Depends(get_opportunity_service)):
    return service.create_campaign(campaign_data)


@router.get("/campaigns/{campaign_id}", response_model=Campaign)
def get_campaign(campaign_id: int, service: OpportunityService = Depends(get_opportunity_service)):
    campaign = service.get_campaign_by_id(campaign_id)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign


@router.put("/campaigns/{campaign_id}", response_model=Campaign)
def update_campaign(campaign_id: int, campaign_data: CampaignUpdate, service: OpportunityService = Depends(get_opportunity_service)):
    campaign = service.update_campaign(campaign_id, campaign_data)
    if not campaign:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return campaign


@router.delete("/campaigns/{campaign_id}")
def delete_campaign(campaign_id: int, service: OpportunityService = Depends(get_opportunity_service)):
    success = service.delete_campaign(campaign_id)
    if not success:
        raise HTTPException(status_code=404, detail="Campaign not found")
    return {"detail": "Campaign deleted successfully"}


@router.get("/tasks/", response_model=list[Task])
def list_tasks(service: OpportunityService = Depends(get_opportunity_service)):
    return service.get_all_tasks()


@router.post("/tasks/", response_model=Task)
def create_task(task_data: TaskCreate, service: OpportunityService = Depends(get_opportunity_service)):
    return service.create_task(task_data)


@router.get("/tasks/{task_id}", response_model=Task)
def get_task(task_id: int, service: OpportunityService = Depends(get_opportunity_service)):
    task = service.get_task_by_id(task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task_data: TaskUpdate, service: OpportunityService = Depends(get_opportunity_service)):
    task = service.update_task(task_id, task_data)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@router.delete("/tasks/{task_id}")
def delete_task(task_id: int, service: OpportunityService = Depends(get_opportunity_service)):
    success = service.delete_task(task_id)
    if not success:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"detail": "Task deleted successfully"}


@router.get("/metrics/", response_model=list[Metric])
def list_metrics(campaign_id: int = None, service: OpportunityService = Depends(get_opportunity_service)):
    if campaign_id:
        return service.get_metrics_by_campaign(campaign_id)
    return []


@router.post("/metrics/", response_model=Metric)
def create_metric(metric_data: MetricCreate, service: OpportunityService = Depends(get_opportunity_service)):
    return service.create_metric(metric_data)


@router.get("/reports/", response_model=list[Report])
def list_reports(campaign_id: int = None, service: OpportunityService = Depends(get_opportunity_service)):
    if campaign_id:
        return service.get_reports_by_campaign(campaign_id)
    return []


@router.post("/reports/", response_model=Report)
def create_report(report_data: ReportCreate, service: OpportunityService = Depends(get_opportunity_service)):
    return service.create_report(report_data)