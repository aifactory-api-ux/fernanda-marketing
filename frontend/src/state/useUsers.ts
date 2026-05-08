import { create } from 'zustand';
import { User, UserUpdate } from '../types/models';
import * as usersApi from '../api/users';

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  updateUser: (id: number, data: UserUpdate) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useUsers = create<UsersState>((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const users = await usersApi.getUsers();
      set({ users, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to fetch users', loading: false });
    }
  },

  updateUser: async (id: number, data: UserUpdate) => {
    set({ loading: true, error: null });
    try {
      const updated = await usersApi.updateUser(id, data);
      set((state) => ({
        users: state.users.map((u) => (u.id === id ? updated : u)),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to update user', loading: false });
    }
  },

  deleteUser: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await usersApi.deleteUser(id);
      set((state) => ({
        users: state.users.filter((u) => u.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to delete user', loading: false });
    }
  },
}));