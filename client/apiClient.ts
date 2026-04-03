import axios from "axios";
import { router } from "expo-router";
import { authService } from "../services/auth-service";

const BASE_URL = "http://192.168.1.132:8080/";
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    if (config.url!.includes("/auth/login")) {
      return config;
    }

    const token = await authService.getToken();
    console.log("Token enviado:", token ? "SÍ" : "NO HAY TOKEN");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      console.log(`Error del servidor [${status}]:`, data);

      if (status === 401) {
        console.warn("Sesión expirada o no autorizada");
        router.replace("/(auth)/login");
      }

      return Promise.reject(error);
    }

    if (error.request) {
      console.error(
        "No se pudo conectar con el servidor. Revisa la IP y la red.",
      );
    } else {
      console.error("Error de configuración en la petición:", error.message);
    }

    return Promise.reject(error);
  },
);

export default api;
