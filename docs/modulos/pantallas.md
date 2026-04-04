# 📱 Pantallas de la Aplicación

Las pantallas están organizadas usando **Expo Router** con navegación basada en archivos y pestañas.

## 🔐 login.tsx

Pantalla de autenticación para el acceso a la aplicación.

**Ruta:** `app/(auth)/login.tsx`  
**Ver archivo completo:** [app/(auth)/login.tsx](<app/(auth)/login.tsx>)

### Funcionalidades:

- **Formulario de login** (email + contraseña)
- **Validación de entrada** en tiempo real
- **Manejo de errores** de autenticación
- **Almacenamiento seguro** del token
- **Redirección automática** a la pantalla principal

### Servicios utilizados:

- `login-service.login()`
- `auth-service` (almacenamiento de token)

## 📦 pending-orders.tsx

Lista de pedidos pendientes asignados al repartidor.

**Ruta:** `app/(tabs)/pending-orders.tsx`  
**Ver archivo completo:** [app/(tabs)/pending-orders.tsx](<app/(tabs)/pending-orders.tsx>)

### Funcionalidades:

- **Lista infinita** de pedidos PENDING
- **Pull-to-refresh** para actualizar
- **Búsqueda/filtrado** opcional
- **Navegación** a detalle de pedido
- **Estados de carga** y error

### Componentes utilizados:

- `OrderCard` (para cada pedido)
- `Section` (contenedor principal)
- `ActivityIndicator` (loading)

### Servicios utilizados:

- `order-service.getOrdersByDeliverer()`

## 🗺️ map.tsx

Visualización de mapa interactivo con ubicaciones de entrega.

**Ruta:** `app/(tabs)/map.tsx`  
**Ver archivo completo:** [app/(tabs)/map.tsx](<app/(tabs)/map.tsx>)

### Funcionalidades:

- **Mapa centrado** en ubicación actual
- **Marcadores** para pedidos activos
- **GPS en tiempo real** del repartidor
- **Navegación GPS** a destino
- **Filtros** por estado de pedido

### Librerías:

- `react-native-maps`
- `expo-location`

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

## 👤 profile.tsx

Perfil personal del repartidor con información de cuenta.

**Ruta:** `app/(tabs)/profile.tsx`  
**Ver archivo completo:** [app/(tabs)/profile.tsx](<app/(tabs)/profile.tsx>)

### Funcionalidades:

- **Información personal** (nombre, email, teléfono)
- **Estadísticas** de entregas (opcional)
- **Configuración** de la app
- **Botón de logout**
- **Editar perfil** (si implementado)

### Componentes utilizados:

- `UserCard`
- `UserSection`

### Servicios utilizados:

- `user-service.getUserProfile()`
- `auth-service.logout()`

## 📋 order/[id].tsx

Detalle completo de un pedido específico (ruta dinámica).

**Ruta:** `app/order/[id].tsx`  
**Ver archivo completo:** [app/order/[id].tsx](app/order/[id].tsx)

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

### Servicios utilizados:

- `order-service.getOrderById(id)`
- `order-service.acceptOrder(id)`
- `order-service.inTransitOrder(id)`
- `order-service.deliveryOrder(id)`

## 🧭 User.tsx

Componente auxiliar en la carpeta de tabs (posiblemente para navegación).

**Ruta:** `app/(tabs)/User.tsx`  
**Ver archivo completo:** [app/(tabs)/User.tsx](<app/(tabs)/User.tsx>)

## 📱 Layouts

### \_layout.tsx (Principal)

Layout raíz que maneja la autenticación inicial.

**Ver archivo completo:** [app/\_layout.tsx](app/_layout.tsx)

### (auth)/\_layout.tsx

Layout para las pantallas de autenticación.

**Ver archivo completo:** [app/(auth)/\_layout.tsx](<app/(auth)/_layout.tsx>)

### (tabs)/\_layout.tsx

Layout con navegación de pestañas inferior.

**Ver archivo completo:** [app/(tabs)/\_layout.tsx](<app/(tabs)/_layout.tsx>)

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
      setError(null);
      const result = await service.getData();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Error al cargar datos');
      console.error('Error:', err);
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

```typescript
<TouchableOpacity
  accessibilityLabel="Aceptar pedido"
  accessibilityHint="Cambia el estado del pedido a aceptado"
  accessibilityRole="button"
>
```

### Estilos:

- **Layout horizontal** (imagen, info, precio)
- **Texto truncado** para nombres largos
- **Alineación consistente**

## 👤 UserCard.tsx

Tarjeta para mostrar información de usuario/cliente.

### Props:

```typescript
interface UserCardProps {
  user: User;
  showContact?: boolean;
  showAddress?: boolean;
}
```

### Funcionalidades:

- **Nombre completo** del usuario
- **Información de contacto** (email, teléfono)
- **Dirección principal**
- **Avatar o iniciales**

### Estilos:

- **Diseño de tarjeta** con sombra
- **Iconos de contacto**
- **Información jerárquica**

## 📱 Section.tsx

Componente genérico para agrupar contenido en secciones.

### Props:

```typescript
interface SectionProps {
  title?: string;
  children: React.ReactNode;
  style?: ViewStyle;
}
```

### Funcionalidades:

- **Título opcional** de sección
- **Contenedor flexible** para cualquier contenido
- **Separadores visuales**
- **Padding consistente**

### Estilos:

- **Background sutil**
- **Bordes redondeados**
- **Espaciado interno**

## 👥 UserSection.tsx

Sección especializada para mostrar información detallada de usuario.

### Props:

```typescript
interface UserSectionProps {
  user: User;
  showActions?: boolean;
  onEdit?: () => void;
}
```

### Funcionalidades:

- **Información completa** del perfil
- **Lista de direcciones**
- **Botones de acción** (editar, contactar)
- **Estadísticas** (si aplica)

### Estilos:

- **Layout vertical** organizado
- **Separación clara** entre secciones
- **Iconos contextuales**

## 🎨 Sistema de Colores

### Hook de Colores (`hooks/colors.ts`):

```typescript
export const Colors = {
  primary: "#007AFF", // Azul principal
  secondary: "#FF9500", // Naranja secundario
  success: "#34C759", // Verde éxito
  danger: "#FF3B30", // Rojo error
  warning: "#FFCC00", // Amarillo advertencia
  text: "#1C1C1E", // Texto principal
  textSecondary: "#8E8E93", // Texto secundario
  background: "#FFFFFF", // Fondo principal
  backgroundSecondary: "#F2F2F7", // Fondo secundario
};
```

### Uso en Componentes:

```typescript
import { Colors } from "@/hooks/colors";

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.background,
    borderColor: Colors.backgroundSecondary,
  },
  title: {
    color: Colors.text,
  },
});
```

## 📏 Sistema de Layout

### Constantes de Dimensiones (`constants/width.ts`):

```typescript
export const WIDTHS = {
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
};

export const PADDING = {
  screen: 20,
  card: 16,
  element: 12,
};
```

### Responsive Design:

- **Flexbox** para layouts adaptativos
- **Dimensiones porcentuales** donde sea necesario
- **SafeAreaView** para áreas seguras
- **Platform.select()** para diferencias iOS/Android

## 🔄 Estados y Props

### Estados Comunes:

```typescript
interface ComponentState {
  loading: boolean;
  error: string | null;
  data: T | null;
}
```

### Props Pattern:

```typescript
interface BaseProps {
  style?: ViewStyle;
  testID?: string;
}

interface SpecificComponentProps extends BaseProps {
  data: DataType;
  onAction: () => void;
}
```

## ♿ Accesibilidad

### Atributos ARIA:

- **`accessibilityLabel`**: Descripción del componente
- **`accessibilityHint`**: Acción que realiza
- **`accessibilityRole`**: Rol semántico

### Ejemplo:

```typescript
<TouchableOpacity
  accessibilityLabel="Ver detalles del pedido"
  accessibilityHint="Abre la pantalla de detalle del pedido"
  accessibilityRole="button"
>
```

## 🧪 Testing

### Props de Testing:

```typescript
testID = "order-card-${order.id}";
```

### Estructura de Tests:

````typescript
describe('OrderCard', () => {
  it('renders order information correctly', () => {
    // Test implementation
  });

  it('calls onPress when tapped', () => {
    // Test implementation
  });
});
```</content>
<parameter name="filePath">c:\Users\esteb\Desktop\2ºDAM\coplaca\app-repartidor\docs\modulos\componentes.md
````
