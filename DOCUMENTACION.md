# 📱 Documentación del Proyecto: App Repartidor

## 📋 Índice

1. [Descripción General](#descripción-general)
2. [Características Principales](#características-principales)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Tecnologías Utilizadas](#tecnologías-utilizadas)
5. [Instalación y Configuración](#instalación-y-configuración)
6. [Scripts Disponibles](#scripts-disponibles)
7. [Descripción de Módulos](#descripción-de-módulos)
8. [Flujo de Navegación](#flujo-de-navegación)
9. [Guía de Desarrollo](#guía-de-desarrollo)

---

## 📌 Descripción General

**App Repartidor** es una aplicación móvil desarrollada con **Expo** y **React Native** que permite a los repartidores gestionar sus entregas de forma eficiente. La aplicación permite visualizar pedidos pendientes, aceptarlos, actualizar su estado y ver la ubicación de entrega en un mapa interactivo.

**Nombre del Proyecto:** MovilRepartidor  
**Versión:** 1.0.0  
**Plataformas Soportadas:** Android, iOS, Web  
**Año Académico:** 2º DAM (Desarrollo de Aplicaciones Multiplataforma)

---

## ✨ Características Principales

### 1. **Gestión de Pedidos**

- Ver lista de pedidos pendientes asignados al repartidor
- Visualizar detalles específicos de cada pedido
- Aceptar pedidos
- Actualizar estado de pedidos (en tránsito, entregado, etc.)

### 2. **Mapa Interactivo**

- Visualizar ubicación de entregas
- Integración con mapas para navegación
- Localización GPS del dispositivo

### 3. **Perfil de Usuario**

- Ver información personal del repartidor
- Datos de contacto
- Información de cuenta

### 4. **Autenticación**

- Sistema de login seguro
- Gestión de sesiones
- Almacenamiento seguro de credenciales con SecureStore

---

## 🗂️ Estructura del Proyecto

```
app-repartidor/
├── app/                          # Carpeta principal de rutas (Expo Router)
│   ├── _layout.tsx               # Layout principal de la app
│   ├── (auth)/                   # Rutas de autenticación
│   │   ├── _layout.tsx           # Layout de autenticación
│   │   └── login.tsx             # Pantalla de login
│   ├── (tabs)/                   # Rutas con navegación de pestañas
│   │   ├── _layout.tsx           # Layout con tabs
│   │   ├── pending-orders.tsx    # Lista de pedidos pendientes
│   │   ├── map.tsx               # Mapa de entregas
│   │   ├── profile.tsx           # Perfil del usuario
│   │   └── User.tsx              # Componente de usuario
│   ├── constants/                # Constantes de la aplicación
│   │   ├── apiConstants.ts       # URLs y rutas de API
│   │   └── width.ts              # Constantes de ancho
│   └── order/                    # Rutas de detalle de pedidos
│       └── [id].tsx              # Pantalla de detalle de pedido dinámico
│
├── assets/                       # Recursos estáticos
│   └── images/                   # Imágenes de la app
│
├── client/                       # Cliente HTTP
│   └── apiClient.ts              # Configuración de Axios
│
├── components/                   # Componentes React Native reutilizables
│   ├── OrderCard.tsx             # Tarjeta de pedido
│   ├── ProductLine.tsx           # Línea de producto
│   ├── Section.tsx               # Componente de sección
│   ├── UserCard.tsx              # Tarjeta de usuario
│   └── UserSection.tsx           # Sección de usuario
│
├── hooks/                        # Hooks personalizados
│   └── colors.ts                 # Hook de colores del tema
│
├── mocks/                        # Datos simulados
│   ├── ordersMock.ts             # Datos simulados de pedidos
│   └── productsMock.ts           # Datos simulados de productos
│
├── models/                       # Modelos de datos TypeScript
│   ├── Order.ts                  # Modelo de Pedido
│   ├── product.ts                # Modelo de Producto
│   └── User.ts                   # Modelo de Usuario
│
├── services/                     # Servicios (lógica de negocio)
│   ├── auth-service.ts           # Servicio de autenticación
│   ├── data-service.ts           # Servicio de peticiones HTTP
│   ├── login-service.ts          # Servicio de inicio de sesión
│   ├── order-service.ts          # Servicio de gestión de pedidos
│   └── user-service.ts           # Servicio de gestión de usuarios
│
├── scripts/                      # Scripts auxiliares
│   └── reset-project.js          # Script para resetear el proyecto
│
├── package.json                  # Dependencias y scripts npm
├── tsconfig.json                 # Configuración de TypeScript
├── eslint.config.js              # Configuración de ESLint
├── app.json                      # Configuración de Expo
├── expo-env.d.ts                 # Definiciones de tipos para Expo
└── README.md                     # Documentación en inglés
```

---

## 🛠️ Tecnologías Utilizadas

### Framework Principal

- **Expo** (v54.0.33) - Framework para desarrollo multiplataforma
- **React Native** (v0.81.5) - Framework para aplicaciones móviles
- **React** (v19.1.0) - Librería de UI

### Enrutamiento

- **Expo Router** (v6.0.23) - Enrutamiento basado en archivos
- **React Navigation** (v7.x) - Navegación de pestañas y pantallas

### HTTP & API

- **Axios** (v1.13.6) - Cliente HTTP para peticiones

### Mapas

- **react-native-maps** (v1.27.2) - Integración de mapas
- **expo-location** (v19.0.8) - Acceso a ubicación GPS

### Animaciones & Gestos

- **react-native-reanimated** (v4.1.1) - Animaciones de alto rendimiento
- **react-native-gesture-handler** (v2.28.0) - Manejo de gestos

### Seguridad

- **expo-secure-store** (v15.0.8) - Almacenamiento seguro de datos

### UI & Estilos

- **@expo/vector-icons** (v15.0.3) - Iconos (Feather, MaterialCommunityIcons)
- **expo-splash-screen** - Pantalla de carga

### Desarrollo

- **TypeScript** (v5.9.2) - Tipado estático
- **ESLint** - Linting de código
- **Expo Font** - Gestión de fuentes

---

## 📥 Instalación y Configuración

### Requisitos Previos

- **Node.js** (v16 o superior)
- **npm** o **yarn**
- **Expo CLI** (opcional pero recomendado)
- Para Android: **Android Studio**
- Para iOS: **Xcode** (macOS)

### Pasos de Instalación

1. **Clonar el repositorio**

   ```bash
   cd app-repartidor
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar variables de entorno** (si es necesario)
   - Crear archivo `.env` en la raíz del proyecto
   - Configurar las URLs de la API según el entorno

4. **Iniciar la aplicación**
   ```bash
   npm start
   ```

---

## 🚀 Scripts Disponibles

| Script                  | Descripción                                    |
| ----------------------- | ---------------------------------------------- |
| `npm start`             | Inicia el servidor de desarrollo de Expo       |
| `npm run android`       | Abre la app en un emulador/dispositivo Android |
| `npm run ios`           | Abre la app en un simulador/dispositivo iOS    |
| `npm run web`           | Abre la app en el navegador (versión web)      |
| `npm run lint`          | Ejecuta ESLint para verificar el código        |
| `npm run reset-project` | Reinicia el proyecto a un estado limpio        |

---

## 📦 Descripción de Módulos

### **Models** (Modelos de Datos)

#### `Order.ts`

Define la estructura de un pedido en el sistema.

```typescript
type Order = {
  id: number;
  orderNumber: string;
  customerId: number;
  status: OrderStatus; // PENDING, CONFIRMED, ASSIGNED, ACCEPTED, IN_TRANSIT, DELIVERED, CANCELLED
  totalPrice: number;
  items: OrderItemDTO[];
  deliveryAddress: AddressDTO;
  estimatedDeliveryTime: string;
  // ... más campos
};
```

#### `User.ts`

Estructura de datos del usuario/repartidor.

#### `product.ts`

Estructura de productos dentro de los pedidos.

### **Services** (Servicios de Negocio)

#### `auth-service.ts`

- Gestiona la autenticación del usuario
- Login y logout
- Obtiene y guarda el ID del usuario autenticado

#### `order-service.ts`

- **`getOrdersByDeliverer()`** - Obtiene pedidos asignados al repartidor
- **`getOrderById(id)`** - Obtiene detalles de un pedido específico
- **`acceptOrder(orderId)`** - Acepta un pedido
- **`inTransitOrder(orderId)`** - Marca pedido como en tránsito
- **`deliveryOrder(orderId)`** - Marca pedido como entregado

#### `data-service.ts`

- Servicio genérico de peticiones HTTP
- Métodos: `getData()`, `putData()`, `postData()`, etc.
- Gestión de errores centralizada

#### `user-service.ts`

- Obtiene información del perfil del usuario
- Actualiza datos de usuario

#### `login-service.ts`

- Lógica específica del login
- Validación de credenciales

### **Components** (Componentes Reutilizables)

#### `OrderCard.tsx`

Tarjeta que muestra resumen de un pedido (número, estado, precio).

#### `ProductLine.tsx`

Componente que representa un producto dentro de un pedido.

#### `UserCard.tsx`

Tarjeta con información del usuario/cliente.

#### `Section.tsx`

Componente genérico para agrupar contenido en secciones.

#### `UserSection.tsx`

Sección especializada para mostrar información de usuario.

### **Pantallas (Screens)**

#### `pending-orders.tsx` 📦

**Descripción:** Lista de todos los pedidos pendientes asignados al repartidor.

**Funcionalidades:**

- Mostrar lista de pedidos con estado PENDING
- Mostrar información básica: número de pedido, cliente, dirección, total
- Navegar a detalle del pedido
- Actualizar la lista

**Componentes utilizados:** OrderCard

---

#### `map.tsx` 🗺️

**Descripción:** Visualización de mapa interactivo con ubicaciones de entrega.

**Funcionalidades:**

- Mostrar mapa con puntos de entrega
- Localización actual del repartidor
- Marcar ubicaciones de pedidos
- Navegación GPS a destino

**Librerías:** react-native-maps, expo-location

---

#### `profile.tsx` 👤

**Descripción:** Perfil personal del repartidor.

**Funcionalidades:**

- Mostrar datos personales
- Información de cuenta
- Estadísticas de entregas (si aplica)
- Opción de logout

**Componentes utilizados:** UserCard, UserSection

---

#### `order/[id].tsx` 📋

**Descripción:** Detalle completo de un pedido específico.

**Funcionalidades:**

- Mostrar todos los detalles del pedido
- Lista de productos y cantidades
- Dirección de entrega
- Botones de acción (aceptar, en tránsito, entregado)
- Tiempo estimado de entrega

**Componentes utilizados:** ProductLine, Section

---

#### `login.tsx` 🔐

**Descripción:** Pantalla de autenticación.

**Funcionalidades:**

- Formulario de login (usuario/email + contraseña)
- Validación de credenciales
- Almacenamiento seguro del token
- Redirección a tab principal después del login

**Servicios utilizados:** auth-service, login-service

---

### **Hooks Personalizados**

#### `colors.ts`

Define la paleta de colores de la aplicación y proporciona un hook personalizado para acceder a los colores según el tema (light/dark).

```typescript
const Colors = {
  primary: "#...",
  secondary: "#...",
  text: "#...",
  // ...
};
```

---

## 🔄 Flujo de Navegación

```
┌─────────────────────────────────────────┐
│         Pantalla Inicial                │
│      (Verifica autenticación)           │
└────────────────┬────────────────────────┘
                 │
        ┌────────▼────────┐
        │ ¿Está logueado? │
        └────────┬────────┘
                 │
         ┌───────┴────────┐
         │                │
      NO│                │YES
         │                │
    ┌────▼──────┐    ┌────▼──────────────────┐
    │  LOGIN    │    │   TAB NAVIGATOR       │
    │  (auth)   │    │  ┌──────────────────┐ │
    └───────────┘    │  │ Pending Orders   │ │
                     │  ├──────────────────┤ │
                     │  │ Map              │ │
                     │  ├──────────────────┤ │
                     │  │ Profile          │ │
                     │  └──────────────────┘ │
                     └────────┬───────────────┘
                              │
                     ┌────────▼────────┐
                     │ Order Details   │
                     │  (modal/stack)  │
                     └─────────────────┘
```

**Flujo de Estados de Pedido:**

```
PENDING → ACCEPTED → IN_TRANSIT → DELIVERED
   ↓
CANCELLED
```

---

## 👨‍💻 Guía de Desarrollo

### Estructura de Carpetas: Convenciones

#### **Crear un nuevo servicio**

Los servicios deben estar en `/services` y seguir este patrón:

```typescript
// services/nuevo-service.ts
import { getData, putData } from "./data-service";
import { authService } from "./auth-service";

export const miServicio = async () => {
  try {
    // Lógica aquí
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
```

#### **Crear un nuevo componente**

Los componentes van en `/components`:

```typescript
// components/MiComponente.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Colors } from '@/hooks/colors';

export default function MiComponente({ prop1, prop2 }) {
  return (
    <View style={{ backgroundColor: Colors.primary }}>
      <Text>{prop1}</Text>
    </View>
  );
}
```

#### **Crear un nuevo modelo**

Los modelos van en `/models`:

```typescript
// models/MiModelo.ts
export type MiModelo = {
  id: number;
  nombre: string;
  activo: boolean;
};
```

### Patrones Comunes

#### **Obtener datos de la API**

```typescript
const [data, setData] = useState<Order[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    const resultado = await getOrdersByDeliverer();
    setData(resultado);
    setLoading(false);
  };
  fetchData();
}, []);
```

#### **Actualizar estado de un pedido**

```typescript
const handleAcceptOrder = async (orderId: string) => {
  try {
    await acceptOrder(orderId);
    // Refrescar lista
    const updated = await getOrdersByDeliverer();
    setOrders(updated);
  } catch (error) {
    console.error("Error al aceptar pedido:", error);
  }
};
```

#### **Usar colores personalizados**

```typescript
import { Colors } from "@/hooks/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    color: Colors.text,
  },
});
```

### Mejores Prácticas

1. **Tipado Strict**: Siempre usar TypeScript con tipos explícitos
2. **Manejo de Errores**: Envolver llamadas API en try-catch
3. **Carga de Datos**: Usar loading states para mejorar UX
4. **Componentes Reutilizables**: Extraer lógica en componentes cuando sea posible
5. **Naming**: Usar nombres descriptivos (orderService, handleAcceptOrder)
6. **Async/Await**: Preferir async/await sobre promesas para código legible

---

## 🔧 Configuración API

Las URLs de la API se encuentran en:

```typescript
// app/constants/apiConstants.ts
export const currentApiVersion = "v1/"; // o la versión que uses
export const ordersMapping = "orders"; // endpoints específicos
```

Se recomienda crear un archivo `.env` para las URLs según el entorno:

```
EXPO_PUBLIC_API_URL=https://api.ejemplo.com
EXPO_PUBLIC_API_VERSION=v1
```

---

## 📱 Configuración por Plataforma

### Android (`app.json` sección android)

- Icono adaptativo configurado
- Edge-to-edge enabled
- Predictive back gesture deshabilitado

### iOS (`app.json` sección ios)

- Soporte para tablet

### Web (`app.json` sección web)

- Output estático
- Favicon configurado

---

## 🐛 Debugging

### Console Logs

La app utiliza `console.log()` y `console.error()` para debugging:

```typescript
console.log("Datos:", data);
console.error("Error:", error);
```

Ver logs en:

- **Android**: `expo start` → View logs
- **iOS**: Xcode console
- **Web**: DevTools del navegador

### React DevTools

Instalar extension de React Native DevTools en Expo Go para inspect elements.

---

## 📝 Notas Importantes

1. **Almacenamiento Seguro**: Las credenciales se guardan con `expo-secure-store`
2. **Ubicación**: Requiere permisos GPS en dispositivo
3. **Mapas**: Necesita configuración de API key de Google Maps/MapBox
4. **Estado Global**: Actualizar lista de pedidos después de cambios de estado
5. **Versión Expo**: Proyecto actualizado a Expo 54+

---

## 🚨 Troubleshooting Común

### "Error de CORS"

Verificar que el backend tenga CORS habilitado.

### "Ubicación no disponible"

Verificar permisos de GPS en `app.json` y dispositivo.

### "Token expirado"

El servicio de autenticación debe renovar el token automáticamente.

### "Mapa no carga"

Verificar API key de MapBox/Google Maps en app.json.

---

## 📞 Contacto y Soporte

Este proyecto fue desarrollado como parte del curso **2º Desarrollo de Aplicaciones Multiplataforma (2º DAM)** en el Instituto COPLACA.

Para más información sobre Expo: https://expo.dev/
Para más información sobre React Native: https://reactnative.dev/

---

**Última actualización:** Abril 2026  
**Versión de documentación:** 1.0
