import { create } from 'zustand';
import { User, UserCreate } from '../types/models';
import * as authApi from '../api/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: UserCreate) => Promise<void>;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null });
    try {
      const response = await authApi.login(email, password);
      localStorage.setItem('token', response.access_token);
      const userData = await authApi.getMe(response.access_token);
      set({ token: response.access_token, user: userData, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Login failed', loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  register: async (data: UserCreate) => {
    set({ loading: true, error: null });
    try {
      await authApi.register(data);
      set({ loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Registration failed', loading: false });
    }
  },
}));