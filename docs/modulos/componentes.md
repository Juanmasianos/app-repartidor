# 🧩 Componentes Reutilizables

Los componentes React Native están diseñados para ser reutilizables y modulares, siguiendo las mejores prácticas de desarrollo.

## 📦 OrderCard.tsx

Tarjeta que muestra un resumen compacto de un pedido.

**Ver archivo completo:** [components/OrderCard.tsx](components/OrderCard.tsx)

### Funcionalidades:

- **Vista compacta** del pedido (número, cliente, total)
- **Indicador de estado** con colores
- **Navegación** al detalle del pedido
- **Información esencial**: dirección, fecha estimada

## 📋 ProductLine.tsx

Componente que representa un producto individual dentro de un pedido.

**Ver archivo completo:** [components/ProductLine.tsx](components/ProductLine.tsx)

### Funcionalidades:

- **Nombre del producto**
- **Cantidad y precio unitario**
- **Subtotal calculado**
- **Formato de moneda** automático

## 👤 UserCard.tsx

Tarjeta para mostrar información de usuario/cliente.

**Ver archivo completo:** [components/UserCard.tsx](components/UserCard.tsx)

### Funcionalidades:

- **Nombre completo** del usuario
- **Información de contacto** (email, teléfono)
- **Dirección principal**
- **Avatar o iniciales**

## 📱 Section.tsx

Componente genérico para agrupar contenido en secciones.

**Ver archivo completo:** [components/Section.tsx](components/Section.tsx)

### Funcionalidades:

- **Título opcional** de sección
- **Contenedor flexible** para cualquier contenido
- **Separadores visuales**
- **Padding consistente**

## 👥 UserSection.tsx

Sección especializada para mostrar información detallada de usuario.

**Ver archivo completo:** [components/UserSection.tsx](components/UserSection.tsx)

### Funcionalidades:

- **Información completa** del perfil
- **Lista de direcciones**
- **Botones de acción** (editar, contactar)
- **Estadísticas** (si aplica)

## 🎨 Sistema de Colores

### Hook de Colores (`hooks/colors.ts`)

**Ver archivo completo:** [hooks/colors.ts](hooks/colors.ts)

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

### Constantes de Dimensiones

**Ver archivo:** [app/constants/width.ts](app/constants/width.ts)

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

```typescript
describe("OrderCard", () => {
  it("renders order information correctly", () => {
    // Test implementation
  });

  it("calls onPress when tapped", () => {
    // Test implementation
  });
});
```

### Funcionalidades:

- **Filtrado por repartidor**: Solo muestra pedidos asignados al usuario actual
- **Manejo de errores**: Logging detallado de errores de API
- **Transformación de datos**: Convierte respuestas de API a objetos Order tipados

## 🌐 data-service.ts

Servicio genérico de peticiones HTTP que centraliza todas las llamadas a la API.

### Métodos Principales:

```typescript
// GET request
getData(endpoint: string): Promise<any>

// PUT request
putData(endpoint: string, data?: any): Promise<any>

// POST request
postData(endpoint: string, data?: any): Promise<any>

// DELETE request
deleteData(endpoint: string): Promise<any>
```

### Funcionalidades:

- **Configuración centralizada** de Axios
- **Manejo de errores unificado**
- **Headers automáticos** (autenticación, content-type)
- **Timeouts configurables**

## 👤 user-service.ts

Servicio para gestión de información del usuario/repartidor.

### Métodos Principales:

```typescript
// Obtener perfil del usuario
getUserProfile(): Promise<User>

// Actualizar información del usuario
updateUserProfile(userData: Partial<User>): Promise<User>

// Obtener direcciones del usuario
getUserAddresses(): Promise<AddressDTO[]>
```

### Funcionalidades:

- **Perfil completo** del repartidor
- **Gestión de direcciones** múltiples
- **Actualización de datos** personales

## 🔑 login-service.ts

Servicio específico para el proceso de autenticación/login.

### Métodos Principales:

```typescript
// Autenticar usuario
login(credentials: LoginCredentials): Promise<AuthResponse>

// Validar credenciales
validateCredentials(email: string, password: string): Promise<boolean>

// Refrescar token
refreshToken(): Promise<string>
```

### Funcionalidades:

- **Validación de entrada** (email, contraseña)
- **Manejo de tokens** JWT
- **Renovación automática** de tokens expirados

## 🏗️ Arquitectura de Servicios

### Patrón de Diseño:

```
Component → Service → data-service → API
```

### Manejo de Errores:

```typescript
try {
  const response = await service.method();
  return response;
} catch (error: any) {
  console.error("--- DEBUG ERROR EN SERVICIO ---");
  console.error("Status:", error.response?.status);
  console.error("Error:", error.message);
  throw error;
}
```

### Configuración API:

```typescript
// constants/apiConstants.ts
export const currentApiVersion = "v1/";
export const ordersMapping = "orders";
export const usersMapping = "users";
```

## 🔄 Estados y Ciclo de Vida

### Ciclo de un Pedido:

1. **Creación** → `getOrdersByDeliverer()` obtiene pedidos PENDING
2. **Aceptación** → `acceptOrder()` cambia estado a ACCEPTED
3. **En Tránsito** → `inTransitOrder()` cambia estado a IN_TRANSIT
4. **Entrega** → `deliveryOrder()` cambia estado a DELIVERED

### Autenticación:

1. **Login** → `login-service.login()` obtiene token
2. **Almacenamiento** → `auth-service` guarda token seguro
3. **Validación** → Cada petición incluye token en headers
4. **Renovación** → Token refresh automático si expira

## 📊 Logging y Debugging

Cada servicio incluye logging detallado:

- **Inicio de operaciones**: `console.log("Iniciando operación...")`
- **Éxito**: `console.log("Operación completada:", data)`
- **Errores**: `console.error("Error en servicio:", error)`
- **Estado HTTP**: `console.error("Status:", error.response.status)`</content>
  <parameter name="filePath">c:\Users\esteb\Desktop\2ºDAM\coplaca\app-repartidor\docs\modulos\servicios.md
