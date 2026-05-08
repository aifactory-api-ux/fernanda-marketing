import { create } from 'zustand';
import { Report, ReportCreate } from '../types/models';
import * as reportsApi from '../api/reports';

interface ReportsState {
  reports: Report[];
  loading: boolean;
  error: string | null;
  fetchReports: (campaignId: number) => Promise<void>;
  createReport: (data: ReportCreate) => Promise<void>;
}

export const useReports = create<ReportsState>((set) => ({
  reports: [],
  loading: false,
  error: null,

  fetchReports: async (campaignId: number) => {
    set({ loading: true, error: null });
    try {
      const reports = await reportsApi.getReports(campaignId);
      set({ reports, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to fetch reports', loading: false });
    }
  },

  createReport: async (data: ReportCreate) => {
    set({ loading: true, error: null });
    try {
      const newReport = await reportsApi.createReport(data);
      set((state) => ({
        reports: [...state.reports, newReport],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to create report', loading: false });
    }
  },
}));