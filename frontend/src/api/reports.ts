import { apiClient, opportunityServiceUrl } from './apiConfig';
import { Report, ReportCreate } from '../types/models';

export const getReports = async (campaignId?: number): Promise<Report[]> => {
  const url = campaignId
    ? `${opportunityServiceUrl}/reports/?campaign_id=${campaignId}`
    : `${opportunityServiceUrl}/reports/`;
  const response = await apiClient.get<Report[]>(url);
  return response.data;
};

export const createReport = async (data: ReportCreate): Promise<Report> => {
  const response = await apiClient.post<Report>(`${opportunityServiceUrl}/reports/`, data);
  return response.data;
};