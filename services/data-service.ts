import api from '../client/apiClient';

export const getData = async <T> (endpoint: string): Promise<T> => {
  const response = await api.get<T>(endpoint);
  return response as any;
};

export const postData = async <T> (endpoint: string, data: any): Promise<T> => {
  const response = await api.post<T>(endpoint, data);
  return response as any;
};

export const putData = async <T> (endpoint: string, data: any): Promise<T> => {
  const response = await api.put<T>(endpoint, data);
  return response as any;
};

export const deleteData = async <T> (endpoint: string): Promise<T> => {
  const response = await api.delete<T>(endpoint);
  return response as any;
};