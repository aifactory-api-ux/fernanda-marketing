export interface User {
  id: number;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
}

export interface UserCreate {
  email: string;
  full_name: string;
  password: string;
  role: string;
}

export interface UserUpdate {
  full_name?: string;
  password?: string;
  role?: string;
  is_active?: boolean;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface Campaign {
  id: number;
  name: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
  budget: number;
  roi: number;
  owner_id: number;
}

export interface CampaignCreate {
  name: string;
  description: string;
  status: string;
  start_date: string;
  end_date: string;
  budget: number;
  roi: number;
  owner_id: number;
}

export interface CampaignUpdate {
  name?: string;
  description?: string;
  status?: string;
  start_date?: string;
  end_date?: string;
  budget?: number;
  roi?: number;
  owner_id?: number;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  due_date: string;
  assigned_to: number;
  campaign_id: number;
}

export interface TaskCreate {
  title: string;
  description: string;
  status: string;
  due_date: string;
  assigned_to: number;
  campaign_id: number;
}

export interface TaskUpdate {
  title?: string;
  description?: string;
  status?: string;
  due_date?: string;
  assigned_to?: number;
  campaign_id?: number;
}

export interface Metric {
  id: number;
  campaign_id: number;
  name: string;
  value: number;
  timestamp: string;
}

export interface MetricCreate {
  campaign_id: number;
  name: string;
  value: number;
  timestamp: string;
}

export interface Report {
  id: number;
  campaign_id: number;
  generated_at: string;
  url: string;
}

export interface ReportCreate {
  campaign_id: number;
  url: string;
}