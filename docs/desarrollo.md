# �‍💻 Guía de Desarrollo

Guía completa para el desarrollo de nuevas funcionalidades siguiendo las mejores prácticas del proyecto.

## 📁 Estructura de Carpetas: Convenciones

### Crear un nuevo servicio

**Ver ejemplo completo:** [services/nuevo-service.ts](services/nuevo-service.ts)

### Crear un nuevo componente

**Ver ejemplo completo:** [components/MiComponente.tsx](components/MiComponente.tsx)

### Crear un nuevo modelo

**Ver ejemplo completo:** [models/MiModelo.ts](models/MiModelo.ts)

### Crear una nueva pantalla

**Ver ejemplo completo:** [app/nueva-pantalla.tsx](app/nueva-pantalla.tsx)

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

### Colores

**Ver archivo completo:** [hooks/colors.ts](hooks/colors.ts)

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

**Ver implementación completa:** [hooks/useApi.ts](hooks/useApi.ts)

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

### Logger Personalizado

**Ver implementación completa:** [utils/logger.ts](utils/logger.ts)

### Error Boundaries

**Ver implementación completa:** [components/ErrorBoundary.tsx](components/ErrorBoundary.tsx)

## 📈 Monitoreo de Rendimiento

### Performance Monitoring

**Ver implementación completa:** [utils/performance.ts](utils/performance.ts)

### FlatList Optimization

```typescript
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
```

## 📋 Mejores Prácticas

### 1. **Tipado Strict**

Siempre usar TypeScript con tipos explícitos.

### 2. **Manejo de Errores**

Envolver llamadas API en try-catch.

### 3. **Componentes Reutilizables**

Extraer lógica común en componentes.

### 4. **Nombres Descriptivos**

Usar nombres que expliquen la función.

### 5. **Async/Await**

Preferir async/await sobre promesas.

### 6. **Separación de Concerns**

Mantener responsabilidades separadas.

## 🔧 Configuración de ESLint

### Reglas Personalizadas

**Ver archivo completo:** [eslint.config.js](eslint.config.js)

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

- **Navegación** a detalle de pedido
- **Estados de carga** y error

### Componentes utilizados:

- `OrderCard` (para cada pedido)
- `Section` (contenedor principal)
- `ActivityIndicator` (loading)

### Estados:

```typescript
const [orders, setOrders] = useState<Order[]>([]);
const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);
```

### Servicios utilizados:

- `order-service.getOrdersByDeliverer()`

### Navegación:

- **OrderCard tap** → Navega a `order/[id]`

---

## 🗺️ map.tsx

Visualización de mapa interactivo con ubicaciones de entrega.

### Ruta: `app/(tabs)/map.tsx`

### Funcionalidades:

- **Mapa centrado** en ubicación actual
- **Marcadores** para pedidos activos
- **GPS en tiempo real** del repartidor
- **Navegación GPS** a destino
- **Filtros** por estado de pedido

### Librerías:

- `react-native-maps`
- `expo-location`

### Estados:

```typescript
const [location, setLocation] = useState<LocationObject | null>(null);
const [orders, setOrders] = useState<Order[]>([]);
const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
```

### Permisos requeridos:

```json
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

---

## 👤 profile.tsx

Perfil personal del repartidor con información de cuenta.

### Ruta: `app/(tabs)/profile.tsx`

### Funcionalidades:

- **Información personal** (nombre, email, teléfono)
- **Estadísticas** de entregas (opcional)
- **Configuración** de la app
- **Botón de logout**
- **Editar perfil** (si implementado)

### Componentes utilizados:

- `UserCard`
- `UserSection`
- `Section`

### Estados:

```typescript
const [user, setUser] = useState<User | null>(null);
const [loading, setLoading] = useState(true);
```

### Servicios utilizados:

- `user-service.getUserProfile()`
- `auth-service.logout()`

### Navegación:

- **Logout** → Redirige a `(auth)/login`

---

## 📋 order/[id].tsx

Detalle completo de un pedido específico (ruta dinámica).

### Ruta: `app/order/[id].tsx`

### Funcionalidades:

- **Vista completa** del pedido
- **Lista de productos** con detalles
- **Dirección de entrega** con mapa
- **Botones de acción** según estado:
  - **Aceptar** (PENDING → ACCEPTED)
  - **En Tránsito** (ACCEPTED → IN_TRANSIT)
  - **Entregado** (IN_TRANSIT → DELIVERED)
- **Información del cliente**
- **Tiempo estimado** de entrega

### Componentes utilizados:

- `ProductLine` (para cada item)
- `Section` (agrupación de información)
- `UserCard` (información del cliente)

### Estados:

```typescript
const [order, setOrder] = useState<Order | null>(null);
const [loading, setLoading] = useState(true);
const [actionLoading, setActionLoading] = useState(false);
```

### Servicios utilizados:

- `order-service.getOrderById(id)`
- `order-service.acceptOrder(id)`
- `order-service.inTransitOrder(id)`
- `order-service.deliveryOrder(id)`

### Parámetros de ruta:

- **`id`**: ID del pedido (string)

---

## 🧭 User.tsx

Componente auxiliar en la carpeta de tabs (posiblemente para navegación).

### Ruta: `app/(tabs)/User.tsx`

### Funcionalidades:

- **Componente de usuario** reutilizable
- **Posiblemente** usado en navegación o modales
- **Información básica** del usuario actual

---

## 📱 Layouts

### \_layout.tsx (Principal)

Layout raíz que maneja la autenticación inicial.

```typescript
// app/_layout.tsx
export default function RootLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  if (loading) return <SplashScreen />;

  return (
    <Stack>
      {isAuthenticated ? (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      )}
    </Stack>
  );
}
```

### (auth)/\_layout.tsx

Layout para las pantallas de autenticación.

```typescript
// app/(auth)/_layout.tsx
export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false,
      animation: 'fade',
    }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}
```

### (tabs)/\_layout.tsx

Layout con navegación de pestañas inferior.

```typescript
// app/(tabs)/_layout.tsx
export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarStyle: { backgroundColor: Colors.primary },
      headerShown: false,
    }}>
      <Tabs.Screen
        name="pending-orders"
        options={{
          title: 'Pedidos',
          tabBarIcon: () => <MaterialCommunityIcons name="truck-delivery-outline" size={28} color={Colors.secondary} />,
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          title: 'Mapa',
          tabBarIcon: () => <Feather name="map-pin" size={24} color={Colors.secondary} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: () => <Feather name="user" size={24} color={Colors.secondary} />,
        }}
      />
    </Tabs>
  );
}
```

## 🔄 Ciclo de Vida de Pantallas

### Patrón Común de Pantalla:

```typescript
export default function ScreenName() {
  // Estados
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efectos
  useEffect(() => {
    loadData();
  }, []);

  // Funciones
  const loadData = async () => {
    try {
      setLoading(true);
      const result = await service.getData();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={loadData} />;

  return (
    <View style={styles.container}>
      {/* Contenido */}
    </View>
  );
}
```

## 📏 Diseño Responsivo

### Breakpoints:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Platform-specific:

```typescript
const styles = StyleSheet.create({
  container: {
    padding: Platform.select({
      ios: 20,
      android: 16,
      default: 24,
    }),
  },
});
```

## ♿ Accesibilidad

### Labels y Hints:

````typescript
<TouchableOpacity
  accessibilityLabel="Aceptar pedido"
  accessibilityHint="Cambia el estado del pedido a aceptado"
  accessibilityRole="button"
>
  <Text>Aceptar</Text>
</TouchableOpacity>
```</content>
<parameter name="filePath">c:\Users\esteb\Desktop\2ºDAM\coplaca\app-repartidor\docs\modulos\pantallas.md
````
