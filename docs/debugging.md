# � Debugging y Troubleshooting

Guía completa para debugging, resolución de problemas comunes y mantenimiento de la aplicación.

## 🔍 Debugging Básico

### Console Logs

La aplicación utiliza `console.log()`, `console.error()` y `console.warn()` para debugging:

```typescript
// Logging estructurado
console.log("🚀 Iniciando carga de pedidos");
console.log("📦 Pedidos obtenidos:", orders.length);
console.error("❌ Error al cargar pedidos:", error);
console.warn("⚠️ Token expirando pronto");
```

### Ver Logs en Diferentes Plataformas

#### Android

```bash
# En terminal con dispositivo/emulador conectado
npx expo start
# Ver logs en la consola de Expo CLI
```

#### iOS

```bash
# Abrir Xcode y ver logs en consola
npx expo start --ios
```

#### Web

```bash
npx expo start --web
# Abrir DevTools del navegador (F12)
```

### React DevTools

1. Instalar React Native Debugger o Flipper
2. Ejecutar la app en modo desarrollo
3. Conectar las DevTools
4. Inspeccionar componentes, estado y props

## 🐛 Problemas Comunes y Soluciones

### 1. **Error de Autenticación (401)**

**Ver solución completa:** [services/auth-service.ts](services/auth-service.ts)

### 2. **Error de Conexión a API**

**Ver diagnóstico completo:** [client/apiClient.ts](client/apiClient.ts)

### 3. **Ubicación GPS no Disponible**

**Ver verificación completa:** [app/(tabs)/map.tsx](<app/(tabs)/map.tsx>)

### 4. **Mapa no Carga**

**Ver configuración completa:** [app.json](app.json)

### 5. **Token Expirado**

**Ver implementación completa:** [services/auth-service.ts](services/auth-service.ts)

## 🛠️ Herramientas de Debugging

### 1. **React Native Debugger**

```bash
# Instalar globalmente
npm install -g react-native-debugger

# Ejecutar
react-native-debugger
```

### 2. **Flipper**

**Ver configuración completa:** [package.json](package.json)

### 3. **Expo DevTools**

```bash
npx expo start
# Abrir http://localhost:19002 en el navegador
```

## 📊 Logging Avanzado

### Logger Personalizado

**Ver implementación completa:** [utils/logger.ts](utils/logger.ts)

### Logging de Peticiones HTTP

**Ver implementación completa:** [client/apiClient.ts](client/apiClient.ts)

## 🔍 Debugging de Componentes

### Debug de Props y State

**Ver componente completo:** [components/DebugOverlay.tsx](components/DebugOverlay.tsx)

## 🚨 Error Boundaries

### Error Boundary Global

**Ver implementación completa:** [components/ErrorBoundary.tsx](components/ErrorBoundary.tsx)

## 📈 Monitoreo de Rendimiento

### Performance Monitoring

**Ver implementación completa:** [utils/performance.ts](utils/performance.ts)

## 🧪 Testing de Debugging

### Tests de Error Handling

**Ver ejemplo completo:** [**tests**/error-handling.test.ts](__tests__/error-handling.test.ts)

## 📋 Checklist de Troubleshooting

### Antes de Reportar un Bug

- [ ] ¿Estás usando la última versión de la app?
- [ ] ¿Has limpiado el cache? (`expo start -c`)
- [ ] ¿Has reinstalado las dependencias? (`rm -rf node_modules && npm install`)
- [ ] ¿Has verificado los logs de la consola?
- [ ] ¿Has probado en diferentes dispositivos/emuladores?

### Información a Incluir en Reportes

```markdown
## Bug Report

**Descripción:**
[Descripción clara del problema]

**Pasos para reproducir:**

1. [Paso 1]
2. [Paso 2]
3. [Resultado esperado vs actual]

**Entorno:**

- Versión de la app: [x.x.x]
- Dispositivo: [Android/iOS/Web]
- OS Version: [xx.x]
- Expo SDK: [xx.x]

**Logs relevantes:**
```

[Pegar logs aquí]

```

**Capturas de pantalla:**
[Adjuntar si aplica]
```

## 🚀 Comandos Útiles para Debugging

```bash
# Limpiar cache de Expo
npx expo start -c

# Limpiar cache de Metro
npx react-native start --reset-cache

# Ver procesos de Node
ps aux | grep node

# Ver puertos en uso
netstat -tulpn | grep :19000

# Limpiar AsyncStorage/SecureStore (solo desarrollo)
# En la app: AsyncStorage.clear() o SecureStore.deleteItemAsync()
```

## 📞 Contacto para Soporte

Si después de seguir esta guía sigues teniendo problemas:

1. Revisa los [issues en GitHub](https://github.com/tu-repo/issues)
2. Crea un nuevo issue con el template de bug report
3. Incluye toda la información solicitada en el checklist

---

**Última actualización:** Abril 2026

export default apiClient;

````

### Constantes de API (`constants/apiConstants.ts`)

```typescript
// Versión de la API
export const currentApiVersion = "v1/";

// Endpoints principales
export const ordersMapping = "orders";
export const usersMapping = "users";
export const authMapping = "auth";

// URLs completas
export const API_ENDPOINTS = {
  // Pedidos
  ORDERS: `${currentApiVersion}${ordersMapping}`,
  ORDER_BY_ID: (id: string) => `${currentApiVersion}${ordersMapping}/${id}`,
  ORDER_ACCEPT: (id: string) =>
    `${currentApiVersion}${ordersMapping}/${id}/accept`,
  ORDER_IN_TRANSIT: (id: string) =>
    `${currentApiVersion}${ordersMapping}/${id}/confirm-loaded`,
  ORDER_DELIVER: (id: string) =>
    `${currentApiVersion}${ordersMapping}/${id}/deliver`,

  // Usuarios
  USERS: `${currentApiVersion}${usersMapping}`,
  USER_PROFILE: `${currentApiVersion}${usersMapping}/profile`,
  USER_ADDRESSES: `${currentApiVersion}${usersMapping}/addresses`,

  // Autenticación
  LOGIN: `${currentApiVersion}${authMapping}/login`,
  LOGOUT: `${currentApiVersion}${authMapping}/logout`,
  REFRESH_TOKEN: `${currentApiVersion}${authMapping}/refresh`,
} as const;
````

## 🔐 Variables de Entorno

### Archivo `.env`

```bash
# API Configuration
EXPO_PUBLIC_API_URL=https://api.tuempresa.com
EXPO_PUBLIC_API_VERSION=v1

# Authentication
EXPO_PUBLIC_AUTH_SECRET=your-secret-key

# Maps
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your-google-maps-key
EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN=your-mapbox-token

# Environment
EXPO_PUBLIC_ENVIRONMENT=development
```

### Uso en el código

```typescript
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
const API_VERSION = process.env.EXPO_PUBLIC_API_VERSION;
const ENVIRONMENT = process.env.EXPO_PUBLIC_ENVIRONMENT;

// Configuración condicional
const isDevelopment = ENVIRONMENT === "development";
const isProduction = ENVIRONMENT === "production";
```

## 📡 Servicio de Datos (`services/data-service.ts`)

Servicio genérico para todas las peticiones HTTP.

```typescript
import apiClient from "../client/apiClient";

// Tipos de respuesta
interface ApiResponse<T = any> {
  data: T;
  message?: string;
  status: number;
}

// Métodos HTTP
export const getData = async <T = any>(
  endpoint: string,
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.get(endpoint);
    return {
      data: response.data,
      message: response.data.message,
      status: response.status,
    };
  } catch (error: any) {
    console.error("GET Error:", error.response?.data || error.message);
    throw error;
  }
};

export const postData = async <T = any>(
  endpoint: string,
  data?: any,
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.post(endpoint, data);
    return {
      data: response.data,
      message: response.data.message,
      status: response.status,
    };
  } catch (error: any) {
    console.error("POST Error:", error.response?.data || error.message);
    throw error;
  }
};

export const putData = async <T = any>(
  endpoint: string,
  data?: any,
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.put(endpoint, data);
    return {
      data: response.data,
      message: response.data.message,
      status: response.status,
    };
  } catch (error: any) {
    console.error("PUT Error:", error.response?.data || error.message);
    throw error;
  }
};

export const deleteData = async <T = any>(
  endpoint: string,
): Promise<ApiResponse<T>> => {
  try {
    const response = await apiClient.delete(endpoint);
    return {
      data: response.data,
      message: response.data.message,
      status: response.status,
    };
  } catch (error: any) {
    console.error("DELETE Error:", error.response?.data || error.message);
    throw error;
  }
};
```

## 🗺️ Configuración de Mapas

### Google Maps

```json
// app.json
{
  "expo": {
    "plugins": [
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Permitir acceso a la ubicación para mostrar entregas cercanas"
        }
      ]
    ]
  }
}
```

### Uso en componentes

```typescript
// components/MapView.tsx
import MapView, { Marker } from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapComponent() {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: userLocation?.latitude || 0,
        longitude: userLocation?.longitude || 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {orders.map((order) => (
        <Marker
          key={order.id}
          coordinate={{
            latitude: order.deliveryAddress.latitude,
            longitude: order.deliveryAddress.longitude,
          }}
          title={order.orderNumber}
          description={order.deliveryAddress.street}
        />
      ))}
    </MapView>
  );
}
```

## 🔒 Autenticación y Seguridad

### Almacenamiento Seguro

```typescript
// services/auth-service.ts
import * as SecureStore from "expo-secure-store";

export class AuthService {
  private static TOKEN_KEY = "authToken";
  private static USER_ID_KEY = "userId";

  static async setToken(token: string): Promise<void> {
    await SecureStore.setItemAsync(this.TOKEN_KEY, token);
  }

  static async getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync(this.TOKEN_KEY);
  }

  static async removeToken(): Promise<void> {
    await SecureStore.deleteItemAsync(this.TOKEN_KEY);
  }

  static async setUserId(userId: number): Promise<void> {
    await SecureStore.setItemAsync(this.USER_ID_KEY, userId.toString());
  }

  static async getUserId(): Promise<number | null> {
    const userId = await SecureStore.getItemAsync(this.USER_ID_KEY);
    return userId ? parseInt(userId) : null;
  }
}
```

### Refresh Token Automático

```typescript
// services/auth-service.ts
export const refreshTokenIfNeeded = async (): Promise<string | null> => {
  try {
    const currentToken = await AuthService.getToken();
    if (!currentToken) return null;

    // Verificar si el token está por expirar
    const tokenPayload = JSON.parse(atob(currentToken.split(".")[1]));
    const expirationTime = tokenPayload.exp * 1000;
    const now = Date.now();
    const timeUntilExpiry = expirationTime - now;

    // Si expira en menos de 5 minutos, refrescar
    if (timeUntilExpiry < 5 * 60 * 1000) {
      const response = await postData(API_ENDPOINTS.REFRESH_TOKEN);
      const newToken = response.data.token;

      await AuthService.setToken(newToken);
      return newToken;
    }

    return currentToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    // Redirigir a login si falla el refresh
    await AuthService.removeToken();
    return null;
  }
};
```

## 📊 Manejo de Errores

### Tipos de Error Personalizados

```typescript
// types/api.ts
export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export class NetworkError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export class AuthenticationError extends ApiError {
  constructor(message: string = "No autenticado") {
    super(message, 401, "UNAUTHENTICATED");
  }
}
```

### Utilidades de Error

```typescript
// utils/errorHandling.ts
export const handleApiError = (error: any): string => {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
        return "Datos inválidos";
      case 401:
        return "Sesión expirada";
      case 403:
        return "No tienes permisos";
      case 404:
        return "Recurso no encontrado";
      case 500:
        return "Error del servidor";
      default:
        return error.message || "Error desconocido";
    }
  }

  if (error.code === "NETWORK_ERROR") {
    return "Error de conexión";
  }

  return "Ha ocurrido un error";
};
```

## 🧪 Testing de API

### Mocks para Testing

```typescript
// __mocks__/apiClient.ts
const mockApiClient = {
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
};

export default mockApiClient;
```

### Tests de Servicios

```typescript
// __tests__/order-service.test.ts
import { getOrdersByDeliverer } from "../services/order-service";
import apiClient from "../client/apiClient";

jest.mock("../client/apiClient");

describe("Order Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch orders for deliverer", async () => {
    const mockOrders = [{ id: 1, orderNumber: "ORD-001" }];
    (apiClient.get as jest.Mock).mockResolvedValue({
      data: { data: mockOrders },
    });

    const result = await getOrdersByDeliverer();

    expect(apiClient.get).toHaveBeenCalledWith("v1/orders/delivery-agent/123");
    expect(result).toEqual(mockOrders);
  });

  it("should handle API errors", async () => {
    (apiClient.get as jest.Mock).mockRejectedValue({
      response: { status: 500, data: { message: "Server error" } },
    });

    await expect(getOrdersByDeliverer()).rejects.toThrow();
  });
});
```

## 📈 Monitoreo y Logging

### Logging de Peticiones

```typescript
// utils/apiLogger.ts
export const logApiRequest = (method: string, endpoint: string, data?: any) => {
  console.log(`🚀 API ${method.toUpperCase()}: ${endpoint}`, data);
};

export const logApiResponse = (
  method: string,
  endpoint: string,
  response: any,
) => {
  console.log(
    `✅ API ${method.toUpperCase()} ${response.status}: ${endpoint}`,
    response.data,
  );
};

export const logApiError = (method: string, endpoint: string, error: any) => {
  console.error(`❌ API ${method.toUpperCase()} Error: ${endpoint}`, {
    status: error.response?.status,
    message: error.response?.data?.message || error.message,
    data: error.response?.data,
  });
};
```

### Interceptor con Logging

```typescript
// client/apiClient.ts
apiClient.interceptors.request.use((config) => {
  logApiRequest(config.method || "GET", config.url || "", config.data);
  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    logApiResponse(
      response.config.method || "GET",
      response.config.url || "",
      response,
    );
    return response;
  },
  (error) => {
    logApiError(error.config?.method || "GET", error.config?.url || "", error);
    return Promise.reject(error);
  },
);
```

## 🚀 Optimización de Rendimiento

### Caching de Respuestas

```typescript
// services/cache-service.ts
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

export class ApiCache {
  private static cache = new Map<string, CacheEntry<any>>();

  static get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.data;
  }

  static set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    });
  }

  static clear(): void {
    this.cache.clear();
  }
}
```

### Uso del Cache

````typescript
// services/order-service.ts
export const getOrdersByDeliverer = async (): Promise<Order[]> => {
  const cacheKey = 'orders-deliverer';
  const cached = ApiCache.get<Order[]>(cacheKey);

  if (cached) {
    return cached;
  }

  try {
    const response = await getData(`${currentApiVersion}${ordersMapping}/delivery-agent/${currentUserId}`);
    const orders = Array.isArray(response) ? response : response.data.data;

    // Cache por 2 minutos
    ApiCache.set(cacheKey, orders, 2 * 60 * 1000);

    return orders as Order[];
  } catch (error: any) {
    console.error('Error fetching orders:', error);
    return [];
  }
};
```</content>
<parameter name="filePath">c:\Users\esteb\Desktop\2ºDAM\coplaca\app-repartidor\docs\api.md
````
