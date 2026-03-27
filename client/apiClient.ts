import axios from 'axios';
import { router } from 'expo-router';
import { authService } from '../services/authService'

const BASE_URL = 'http://localhost:8000/api';

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
    const token = await authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- INTERCEPTOR DE RESPUESTA ---
api.interceptors.response.use(
  (response) => {
    // Si la respuesta es 2xx, pasa directamente
    return response;
  },
  (error) => {
    // Manejo global de errores (401, 404, 500)
    if (error.response) {
      console.log(`Error ${error.response.status}:`, error.response.data);
      
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