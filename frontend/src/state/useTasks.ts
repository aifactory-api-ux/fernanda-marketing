import { create } from 'zustand';
import { Task, TaskCreate, TaskUpdate } from '../types/models';
import * as tasksApi from '../api/tasks';

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  createTask: (data: TaskCreate) => Promise<void>;
  updateTask: (id: number, data: TaskUpdate) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
}

export const useTasks = create<TasksState>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchTasks: async () => {
    set({ loading: true, error: null });
    try {
      const tasks = await tasksApi.getTasks();
      set({ tasks, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to fetch tasks', loading: false });
    }
  },

  createTask: async (data: TaskCreate) => {
    set({ loading: true, error: null });
    try {
      const newTask = await tasksApi.createTask(data);
      set((state) => ({
        tasks: [...state.tasks, newTask],
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to create task', loading: false });
    }
  },

  updateTask: async (id: number, data: TaskUpdate) => {
    set({ loading: true, error: null });
    try {
      const updated = await tasksApi.updateTask(id, data);
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === id ? updated : t)),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to update task', loading: false });
    }
  },

  deleteTask: async (id: number) => {
    set({ loading: true, error: null });
    try {
      await tasksApi.deleteTask(id);
      set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        loading: false,
      }));
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Failed to delete task', loading: false });
    }
  },
}));