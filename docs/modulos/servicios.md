# � Servicios de Negocio

Los servicios contienen la lógica de negocio de la aplicación, manejando las llamadas a la API y el procesamiento de datos.

## 🔐 auth-service.ts

Gestiona la autenticación del usuario y el almacenamiento seguro de credenciales.

**Ver archivo completo:** [services/auth-service.ts](services/auth-service.ts)

### Funcionalidades:

- **Almacenamiento seguro** con `expo-secure-store`
- **Gestión de tokens** de autenticación
- **Validación de sesión** activa

## 📦 order-service.ts

Servicio principal para la gestión de pedidos del repartidor.

**Ver archivo completo:** [services/order-service.ts](services/order-service.ts)

### Funcionalidades:

- **Filtrado por repartidor**: Solo muestra pedidos asignados al usuario actual
- **Manejo de errores**: Logging detallado de errores de API
- **Transformación de datos**: Convierte respuestas de API a objetos Order tipados

## 🌐 data-service.ts

Servicio genérico de peticiones HTTP que centraliza todas las llamadas a la API.

**Ver archivo completo:** [services/data-service.ts](services/data-service.ts)

### Funcionalidades:

- **Configuración centralizada** de Axios
- **Manejo de errores unificado**
- **Headers automáticos** (autenticación, content-type)
- **Timeouts configurables**

## 👤 user-service.ts

Servicio para gestión de información del usuario/repartidor.

**Ver archivo completo:** [services/user-service.ts](services/user-service.ts)

### Funcionalidades:

- **Perfil completo** del repartidor
- **Gestión de direcciones** múltiples
- **Actualización de datos** personales

## 🔑 login-service.ts

Servicio específico para el proceso de autenticación/login.

**Ver archivo completo:** [services/login-service.ts](services/login-service.ts)

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
  // Lógica aquí
} catch (error: any) {
  console.error("Error en servicio:", error);
  throw error;
}
```

### Configuración API:

**Ver archivo:** [app/constants/apiConstants.ts](app/constants/apiConstants.ts)

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
- **Estado HTTP**: `console.error("Status:", error.response.status)`

````

### Campos Importantes:

- **`status`**: Estado del pedido (7 posibles estados)
- **`items`**: Array de productos con cantidades y precios
- **`deliveryAddress`**: Dirección de entrega (heredado de User)
- **`estimatedDeliveryTime`**: Tiempo estimado de entrega
- **`deliveryAgentId/Name`**: Información del repartidor asignado

## 👤 User.ts

Estructura de datos del usuario/repartidor y direcciones.

```typescript
export type AddressDTO = {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  latitude?: number;
  longitude?: number;
};

export type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: string;
  isActive: boolean;
  addresses: AddressDTO[];
  createdAt: string;
  updatedAt: string;
};
````

### Campos Importantes:

- **`addresses`**: Array de direcciones (múltiples direcciones por usuario)
- **`role`**: Rol del usuario (repartidor, cliente, etc.)
- **`latitude/longitude`**: Coordenadas GPS opcionales

## 📦 product.ts

Estructura de productos dentro de los pedidos.

```typescript
export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
```

### Campos Importantes:

- **`price`**: Precio unitario del producto
- **`category`**: Categorización del producto
- **`imageUrl`**: URL opcional de imagen del producto

## 🔄 Estados de Pedido

Los pedidos pueden tener los siguientes estados:

1. **`PENDING`** - Pedido creado, esperando confirmación
2. **`CONFIRMED`** - Pedido confirmado por el cliente
3. **`ASSIGNED`** - Pedido asignado a un repartidor
4. **`ACCEPTED`** - Repartidor aceptó el pedido
5. **`IN_TRANSIT`** - Pedido en camino hacia el destino
6. **`DELIVERED`** - Pedido entregado exitosamente
7. **`CANCELLED`** - Pedido cancelado

## 📋 Validaciones

### Order

- `id`: Número positivo requerido
- `orderNumber`: String único requerido
- `totalPrice`: Número positivo requerido
- `status`: Uno de los valores enum válidos
- `items`: Array no vacío requerido

### User

- `email`: Formato de email válido
- `phone`: Formato de teléfono válido
- `addresses`: Al menos una dirección requerida

### Product

- `price`: Número positivo requerido
- `name`: String no vacío requerido
- `category`: String no vacío requerido</content>
  <parameter name="filePath">c:\Users\esteb\Desktop\2ºDAM\coplaca\app-repartidor\docs\modulos\modelos.md
