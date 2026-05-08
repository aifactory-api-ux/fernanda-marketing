import { apiClient, opportunityServiceUrl } from './apiConfig';
import { Task, TaskCreate, TaskUpdate } from '../types/models';

export const getTasks = async (): Promise<Task[]> => {
  const response = await apiClient.get<Task[]>(`${opportunityServiceUrl}/tasks/`);
  return response.data;
};

export const getTask = async (taskId: number): Promise<Task> => {
  const response = await apiClient.get<Task>(`${opportunityServiceUrl}/tasks/${taskId}`);
  return response.data;
};

export const createTask = async (data: TaskCreate): Promise<Task> => {
  const response = await apiClient.post<Task>(`${opportunityServiceUrl}/tasks/`, data);
  return response.data;
};

export const updateTask = async (taskId: number, data: TaskUpdate): Promise<Task> => {
  const response = await apiClient.put<Task>(`${opportunityServiceUrl}/tasks/${taskId}`, data);
  return response.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await apiClient.delete(`${opportunityServiceUrl}/tasks/${taskId}`);
};