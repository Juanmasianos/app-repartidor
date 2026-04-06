# 📱 App Repartidor

Aplicación móvil para gestión de entregas desarrollada con **Expo** y **React Native**.

## 📋 Descripción

**App Repartidor** permite a los repartidores gestionar sus entregas de forma eficiente. La aplicación permite visualizar pedidos pendientes, aceptarlos, actualizar su estado y ver la ubicación de entrega en un mapa interactivo.

**Nombre del Proyecto:** MovilRepartidor  
**Versión:** 1.0.0  
**Plataformas Soportadas:** Android, iOS, Web  
**Año Académico:** 2º DAM (Desarrollo de Aplicaciones Multiplataforma)

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

## 🚀 Inicio Rápido

### Requisitos Previos

- **Node.js** (v16 o superior)
- **npm** o **yarn**
- **Expo CLI** (opcional pero recomendado)
- Para Android: **Android Studio**
- Para iOS: **Xcode** (macOS)

### Instalación

1. **Instalar dependencias**

   ```bash
   npm install
   ```

2. **Iniciar la aplicación**
   ```bash
   npm start
   ```

## 📚 Documentación

- **[📁 Estructura del Proyecto](docs/estructura.md)** - Arquitectura y tecnologías utilizadas
- **[📦 Módulos](docs/modulos/)**
  - [Modelos de Datos](docs/modulos/modelos.md)
  - [Servicios](docs/modulos/servicios.md)
  - [Componentes](docs/modulos/componentes.md)
  - [Pantallas](docs/modulos/pantallas.md)
- **[👨‍💻 Guía de Desarrollo](docs/desarrollo.md)** - Patrones, mejores prácticas y convenciones
- **[🔧 Configuración API](docs/api.md)** - Configuración de API y plataformas
- **[🐛 Debugging](docs/debugging.md)** - Solución de problemas comunes

## 📱 Scripts Disponibles

| Script                  | Descripción                                    |
| ----------------------- | ---------------------------------------------- |
| `npm start`             | Inicia el servidor de desarrollo de Expo       |
| `npm run android`       | Abre la app en un emulador/dispositivo Android |
| `npm run ios`           | Abre la app en un simulador/dispositivo iOS    |
| `npm run web`           | Abre la app en el navegador (versión web)      |
| `npm run lint`          | Ejecuta ESLint para verificar el código        |
| `npm run reset-project` | Reinicia el proyecto a un estado limpio        |

**Flujo de Estados de Pedido:**

```
PENDING → ACCEPTED → IN_TRANSIT → DELIVERED
   ↓
CANCELLED
```

## 📞 Contacto y Soporte

Este proyecto fue desarrollado como parte del curso **2º Desarrollo de Aplicaciones Multiplataforma (2º DAM)** en el Instituto COPLACA.

Para más información sobre Expo: https://expo.dev/  
Para más información sobre React Native: https://reactnative.dev/

---

**Última actualización:** Abril 2026  
**Versión de documentación:** 1.0</content>
<parameter name="filePath">c:\Users\esteb\Desktop\2ºDAM\coplaca\app-repartidor\README.md
