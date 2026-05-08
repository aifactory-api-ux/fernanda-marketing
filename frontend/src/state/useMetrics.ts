import { create } from 'zustand';
import { Metric, MetricCreate } from '../types/models';
import * as metricsApi from '../api/metrics';

interface MetricsState {
  metrics: Metric[];
  loading: boolean;
  error: string | null;
  fetchMetrics: (campaignId: number) => Promise<void>;
  createMetric: (data: MetricCreate) => Promise<void>;
}

export const useMetrics = create<MetricsState>((set) => ({
  metrics: [],
  loading: false,
  error: null,

  fetchMetrics: async (campaignId: number) => {
    set({ loading: true, error: null });
    try {
      const metrics = await metricsApi.getMetrics(campaignId);
      set({ metrics, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to fetch metrics', loading: false });
    }
  },

  createMetric: async (data: MetricCreate) => {
    set({ loading: true, error: null });
    try {
      const newMetric = await metricsApi.createMetric(data);
      set((state) => ({
        metrics: [...state.metrics, newMetric],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to create metric', loading: false });
    }
  },
}));