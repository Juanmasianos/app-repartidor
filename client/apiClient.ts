import axios from 'axios';
import { router } from 'expo-router';
import { authService } from '../services/authService'

const BASE_URL = 'http://192.168.1.137:8080/';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use(

  async (config) => {
    if (config.url!.includes('/auth/login')) {
      return config;
    }

    const token = await authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      console.log(`Error ${error.response.status}:`, error.response.data);
      if (error.response) {
        console.log("Datos del error de Spring:", error.response.data);
        return Promise.reject(error.response.data);
      }
      if (error.response.status === 401) {
        console.warn("Sesión expirada");
        router.replace('/(auth)/login');
      }
    } else {
      console.log("Error de red o servidor no disponible");
    }

    return Promise.reject(error);
  }
);

export default api;