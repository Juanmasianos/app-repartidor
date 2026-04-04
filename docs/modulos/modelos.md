# � Modelos de Datos

Los modelos de datos definen la estructura de las entidades principales de la aplicación usando TypeScript para garantizar el tipado fuerte.

## 📦 Order.ts

Define la estructura completa de un pedido en el sistema.

**Ver archivo completo:** [models/Order.ts](models/Order.ts)

### Campos Importantes:

- **`status`**: Estado del pedido (7 posibles estados)
- **`items`**: Array de productos con cantidades y precios
- **`deliveryAddress`**: Dirección de entrega (heredado de User)
- **`estimatedDeliveryTime`**: Tiempo estimado de entrega
- **`deliveryAgentId/Name`**: Información del repartidor asignado

## 👤 User.ts

Estructura de datos del usuario/repartidor y direcciones.

**Ver archivo completo:** [models/User.ts](models/User.ts)

### Campos Importantes:

- **`addresses`**: Array de direcciones (múltiples direcciones por usuario)
- **`role`**: Rol del usuario (repartidor, cliente, etc.)
- **`latitude/longitude`**: Coordenadas GPS opcionales

## 📦 product.ts

Estructura de productos dentro de los pedidos.

**Ver archivo completo:** [models/product.ts](models/product.ts)

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
  <parameter name="filePath">c:\Users\esteb\Desktop\2ºDAM\coplaca\app-repartidor\docs\estructura.md
