import { apiClient, opportunityServiceUrl } from './apiConfig';
import { Campaign, CampaignCreate, CampaignUpdate } from '../types/models';

export const getCampaigns = async (): Promise<Campaign[]> => {
  const response = await apiClient.get<Campaign[]>(`${opportunityServiceUrl}/campaigns/`);
  return response.data;
};

export const getCampaign = async (campaignId: number): Promise<Campaign> => {
  const response = await apiClient.get<Campaign>(`${opportunityServiceUrl}/campaigns/${campaignId}`);
  return response.data;
};

export const createCampaign = async (data: CampaignCreate): Promise<Campaign> => {
  const response = await apiClient.post<Campaign>(`${opportunityServiceUrl}/campaigns/`, data);
  return response.data;
};

export const updateCampaign = async (campaignId: number, data: CampaignUpdate): Promise<Campaign> => {
  const response = await apiClient.put<Campaign>(`${opportunityServiceUrl}/campaigns/${campaignId}`, data);
  return response.data;
};

export const deleteCampaign = async (campaignId: number): Promise<void> => {
  await apiClient.delete(`${opportunityServiceUrl}/campaigns/${campaignId}`);
};