import { apiClient, opportunityServiceUrl } from './apiConfig';
import { Metric, MetricCreate } from '../types/models';

export const getMetrics = async (campaignId?: number): Promise<Metric[]> => {
  const url = campaignId
    ? `${opportunityServiceUrl}/metrics/?campaign_id=${campaignId}`
    : `${opportunityServiceUrl}/metrics/`;
  const response = await apiClient.get<Metric[]>(url);
  return response.data;
};

export const createMetric = async (data: MetricCreate): Promise<Metric> => {
  const response = await apiClient.post<Metric>(`${opportunityServiceUrl}/metrics/`, data);
  return response.data;
};