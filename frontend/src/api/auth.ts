import { apiClient, authServiceUrl } from './apiConfig';
import { Token, UserCreate } from '../types/models';

export const login = async (email: string, password: string): Promise<Token> => {
  const response = await apiClient.post<Token>(`${authServiceUrl}/auth/login`, { email, password });
  return response.data;
};

export const register = async (data: UserCreate): Promise<any> => {
  const response = await apiClient.post(`${authServiceUrl}/auth/register`, data);
  return response.data;
};

export const getMe = async (token: string): Promise<any> => {
  const response = await apiClient.get(`${authServiceUrl}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};