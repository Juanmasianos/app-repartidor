# � Configuración API

Configuración completa de la API, endpoints y comunicación con el backend.

## 🌐 Configuración Base

### Cliente HTTP (`client/apiClient.ts`)

**Ver archivo completo:** [client/apiClient.ts](client/apiClient.ts)

### Constantes de API (`constants/apiConstants.ts`)

**Ver archivo completo:** [app/constants/apiConstants.ts](app/constants/apiConstants.ts)

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

**Ver archivo completo:** [services/data-service.ts](services/data-service.ts)

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

**Ver ejemplo completo:** [components/MapView.tsx](components/MapView.tsx)

## 🔒 Autenticación y Seguridad

### Almacenamiento Seguro

**Ver implementación completa:** [services/auth-service.ts](services/auth-service.ts)

### Refresh Token Automático

**Ver implementación completa:** [services/auth-service.ts](services/auth-service.ts)

## 📊 Manejo de Errores

### Tipos de Error Personalizados

**Ver archivo completo:** [types/api.ts](types/api.ts)

### Utilidades de Error

**Ver archivo completo:** [utils/errorHandling.ts](utils/errorHandling.ts)

## 🧪 Testing de API

### Mocks para Testing

**Ver archivo completo:** [**mocks**/apiClient.ts](__mocks__/apiClient.ts)

### Tests de Servicios

**Ver ejemplo completo:** [**tests**/order-service.test.ts](__tests__/order-service.test.ts)

## 📈 Monitoreo y Logging

### Logging de Peticiones HTTP

**Ver implementación completa:** [client/apiClient.ts](client/apiClient.ts)

### Uso del Cache

**Ver implementación completa:** [services/cache-service.ts](services/cache-service.ts)

const styles = StyleSheet.create({
container: {
backgroundColor: Colors.background,
padding: 16,
borderRadius: 8,
},
title: {
color: Colors.text,
fontSize: 16,
fontWeight: '600',
},
});

````

### Crear un nuevo modelo

Los modelos van en `/models`:

```typescript
// models/MiModelo.ts
export interface MiModelo {
  id: number;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CrearMiModeloDTO {
  nombre: string;
  descripcion?: string;
}
````

### Crear una nueva pantalla

Las pantallas van en `/app` siguiendo la estructura de Expo Router:

```typescript
// app/nueva-pantalla.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '@/hooks/colors';

export default function NuevaPantalla() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Llamada a servicio
      const result = await miServicio.getData();
      setData(result);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Pantalla</Text>
      {/* Contenido */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 20,
  },
});
```

## 🔄 Patrones Comunes

### Obtener datos de la API

```typescript
const [data, setData] = useState<Type[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const resultado = await service.getData();
      setData(resultado);
    } catch (err: any) {
      setError(err.message || "Error al cargar datos");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);
```

### Actualizar estado de un pedido

```typescript
const handleAcceptOrder = async (orderId: string) => {
  try {
    setActionLoading(true);
    await acceptOrder(orderId);

    // Refrescar lista
    const updated = await getOrdersByDeliverer();
    setOrders(updated);

    // Mostrar feedback
    Alert.alert("Éxito", "Pedido aceptado correctamente");
  } catch (error) {
    console.error("Error al aceptar pedido:", error);
    Alert.alert("Error", "No se pudo aceptar el pedido");
  } finally {
    setActionLoading(false);
  }
};
```

### Usar colores personalizados

```typescript
import { Colors } from "@/hooks/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    borderColor: Colors.secondary,
  },
  text: {
    color: Colors.text,
  },
  secondaryText: {
    color: Colors.textSecondary,
  },
});
```

### Manejo de navegación

```typescript
import { useRouter } from "expo-router";

export default function MiPantalla() {
  const router = useRouter();

  const goToOrderDetail = (orderId: string) => {
    router.push(`/order/${orderId}`);
  };

  const goBack = () => {
    router.back();
  };

  const goToProfile = () => {
    router.push("/profile");
  };
}
```

## 📏 Sistema de Diseño

### Espaciado Consistente

```typescript
// constants/spacing.ts
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};
```

### Tipografía

```typescript
// constants/typography.ts
export const TYPOGRAPHY = {
  h1: { fontSize: 32, fontWeight: "bold" },
  h2: { fontSize: 24, fontWeight: "bold" },
  h3: { fontSize: 20, fontWeight: "600" },
  body: { fontSize: 16, fontWeight: "normal" },
  caption: { fontSize: 14, fontWeight: "normal" },
  small: { fontSize: 12, fontWeight: "normal" },
};
```

### Sombras y Elevación

```typescript
// constants/shadows.ts
export const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
};
```

## 🔄 Estados y Gestión de Estado

### Patrón de Estados Común

```typescript
interface ScreenState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
}

const initialState: ScreenState<Order[]> = {
  data: null,
  loading: true,
  error: null,
  refreshing: false,
};
```

### Custom Hook para API Calls

```typescript
// hooks/useApi.ts
export function useApi<T>(apiCall: () => Promise<T>) {
  const [state, setState] = useState<ScreenState<T>>(initialState);

  const execute = useCallback(async () => {
    try {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      const data = await apiCall();
      setState((prev) => ({ ...prev, data, loading: false }));
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        error: error.message,
        loading: false,
      }));
    }
  }, [apiCall]);

  const refresh = useCallback(async () => {
    setState((prev) => ({ ...prev, refreshing: true }));
    await execute();
    setState((prev) => ({ ...prev, refreshing: false }));
  }, [execute]);

  useEffect(() => {
    execute();
  }, [execute]);

  return { ...state, refresh };
}
```

## 🧪 Testing

### Estructura de Tests

```typescript
// __tests__/MiComponente.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MiComponente from '../components/MiComponente';

describe('MiComponente', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <MiComponente title="Test Title" />
    );

    expect(getByText('Test Title')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <MiComponente title="Test" onPress={mockOnPress} />
    );

    fireEvent.press(getByTestId('mi-componente'));
    expect(mockOnPress).toHaveBeenCalled();
  });
});
```

### Mock de Servicios

```typescript
// __mocks__/order-service.ts
export const getOrdersByDeliverer = jest.fn().mockResolvedValue([
  {
    id: 1,
    orderNumber: "ORD-001",
    status: "PENDING",
    // ... otros campos
  },
]);
```

## 🐛 Debugging

### Console Logs Estructurados

```typescript
// constants/logger.ts
export const logger = {
  info: (message: string, data?: any) => {
    console.log(`ℹ️ ${message}`, data);
  },
  error: (message: string, error?: any) => {
    console.error(`❌ ${message}`, error);
  },
  success: (message: string, data?: any) => {
    console.log(`✅ ${message}`, data);
  },
  warning: (message: string, data?: any) => {
    console.warn(`⚠️ ${message}`, data);
  },
};
```

### Error Boundaries

```typescript
// components/ErrorBoundary.tsx
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<{}, ErrorBoundaryState> {
  constructor(props: {}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error('Error Boundary caught an error', { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Algo salió mal</Text>
          <TouchableOpacity onPress={() => this.setState({ hasError: false })}>
            <Text>Reintentar</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}
```

## 📱 Mejores Prácticas

### 1. **Tipado Strict**

Siempre usar TypeScript con tipos explícitos:

```typescript
// ✅ Bien
interface User {
  id: number;
  name: string;
  email: string;
}

// ❌ Mal
const user = {
  id: 1,
  name: "John",
  email: "john@example.com",
};
```

### 2. **Manejo de Errores**

Envolver llamadas API en try-catch:

```typescript
// ✅ Bien
try {
  const data = await apiCall();
  setData(data);
} catch (error) {
  logger.error("Error al cargar datos", error);
  setError("No se pudieron cargar los datos");
}

// ❌ Mal
const data = await apiCall();
setData(data);
```

### 3. **Componentes Reutilizables**

Extraer lógica común en componentes:

```typescript
// ✅ Bien
const LoadingSpinner = ({ size = 'large' }) => (
  <ActivityIndicator size={size} color={Colors.primary} />
);

// ❌ Mal
<ActivityIndicator size="large" color="#007AFF" />
```

### 4. **Nombres Descriptivos**

Usar nombres que expliquen la función:

```typescript
// ✅ Bien
const handleAcceptOrder = async (orderId: string) => { ... }
const fetchUserProfile = async () => { ... }
const formatCurrency = (amount: number) => { ... }

// ❌ Mal
const handleClick = async (id: string) => { ... }
const getData = async () => { ... }
const f = (a: number) => { ... }
```

### 5. **Async/Await**

Preferir async/await sobre promesas:

```typescript
// ✅ Bien
const loadData = async () => {
  const data = await fetchData();
  const processed = await processData(data);
  return processed;
};

// ❌ Mal
const loadData = () => {
  return fetchData()
    .then((data) => processData(data))
    .then((processed) => processed);
};
```

### 6. **Separación de Concerns**

Mantener responsabilidades separadas:

```typescript
// ✅ Bien
// services/user-service.ts - Lógica de negocio
// components/UserCard.tsx - Presentación
// screens/Profile.tsx - Coordinación

// ❌ Mal
// Todo mezclado en un solo archivo
```

## 🔧 Configuración de ESLint

### Reglas Personalizadas

```javascript
// eslint.config.js
module.exports = {
  extends: ["expo", "prettier"],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "react-native/no-unused-styles": "error",
    "react-native/no-inline-styles": "warn",
  },
};
```

## 🚀 Optimización de Rendimiento

### Memoización

```typescript
import React, { useMemo, useCallback } from "react";

const filteredOrders = useMemo(() => {
  return orders.filter((order) => order.status === "PENDING");
}, [orders]);

const handleOrderPress = useCallback(
  (orderId: string) => {
    navigation.navigate("OrderDetail", { orderId });
  },
  [navigation],
);
```

### Lazy Loading

```typescript
// app/_layout.tsx
const Profile = lazy(() => import('./profile'));
const Map = lazy(() => import('./map'));

// En el componente
<Suspense fallback={<LoadingSpinner />}>
  <Profile />
</Suspense>
```

### FlatList Optimization

````typescript
<FlatList
  data={orders}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => <OrderCard order={item} />}
  initialNumToRender={10}
  maxToRenderPerBatch={10}
  windowSize={10}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index
  })}
  removeClippedSubviews={true}
/>
```</content>
<parameter name="filePath">c:\Users\esteb\Desktop\2ºDAM\coplaca\app-repartidor\docs\desarrollo.md
````
