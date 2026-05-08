import { apiClient, authServiceUrl } from './apiConfig';
import { User, UserUpdate } from '../types/models';

export const getUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>(`${authServiceUrl}/users/`);
  return response.data;
};

export const getUser = async (userId: number): Promise<User> => {
  const response = await apiClient.get<User>(`${authServiceUrl}/users/${userId}`);
  return response.data;
};

export const updateUser = async (userId: number, data: UserUpdate): Promise<User> => {
  const response = await apiClient.put<User>(`${authServiceUrl}/users/${userId}`, data);
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await apiClient.delete(`${authServiceUrl}/users/${userId}`);
};