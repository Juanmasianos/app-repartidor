import api from '../client/apiClient';

export const getData = async (endpoint: string) => {
  const response = await api.get(endpoint);
  return response; 
};

export const postData = async (endpoint: string, data: any) => {
  const response = await api.post(endpoint, data);
  return response;
};

export const putData = async (endpoint: string, data: any) => {
  const response = await api.put(endpoint, data);
  return response;
};

export const deleteData = async (endpoint: string) => {
  const response = await api.delete(endpoint);
  return response;
};