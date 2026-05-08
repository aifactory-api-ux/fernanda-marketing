import { create } from 'zustand';
import { Campaign, CampaignCreate, CampaignUpdate } from '../types/models';
import * as campaignsApi from '../api/campaigns';

interface CampaignsState {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;
  fetchCampaigns: () => Promise<void>;
  createCampaign: (data: CampaignCreate) => Promise<void>;
  updateCampaign: (id: number, data: CampaignUpdate) => Promise<void>;
  deleteCampaign: (id: number) => Promise<void>;
}

export const useCampaigns = create<CampaignsState>((set) => ({
  campaigns: [],
  loading: false,
  error: null,

  fetchCampaigns: async () => {
    set({ loading: true, error: null });
    try {
      const campaigns = await campaignsApi.getCampaigns();
      set({ campaigns, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to fetch campaigns', loading: false });
    }
  },

  createCampaign: async (data: CampaignCreate) => {
    set({ loading: true, error: null });
    try {
      const newCampaign = await campaignsApi.createCampaign(data);
      set((state) => ({
        campaigns: [...state.campaigns, newCampaign],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to create campaign', loading: false });
    }
  },

  updateCampaign: async (id: number, data: CampaignUpdate) => {
    set({ loading: true, error: null });
    try {
      const updated = await campaignsApi.updateCampaign(id, data);
      set((state) => ({
        campaigns: state.campaigns.map((c) => (c.id === id ? updated : c)),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to update campaign', loading: false });
    }
  },

  deleteCampaign: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await campaignsApi.deleteCampaign(id);
      set((state) => ({
        campaigns: state.campaigns.filter((c) => c.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to delete campaign', loading: false });
    }
  },
}));