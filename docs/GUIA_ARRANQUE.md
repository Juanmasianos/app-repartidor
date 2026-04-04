# Guía de Arranque - App Repartidor (MovilRepartidor)

## Introducción

Esta guía proporciona los pasos necesarios para configurar y ejecutar la aplicación móvil "MovilRepartidor", una app desarrollada con Expo y React Native para dispositivos iOS, Android y web. La aplicación está diseñada para repartidores y utiliza funcionalidades como mapas, ubicación GPS y navegación.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes componentes en tu sistema:

### Software Requerido
- **Node.js**: Versión 18 o superior. Descárgalo desde [nodejs.org](https://nodejs.org/).
- **npm**: Viene incluido con Node.js. Alternativamente, puedes usar Yarn.
- **Expo CLI**: Instálalo globalmente con `npm install -g @expo/cli`.
- **Git**: Para clonar el repositorio (opcional si ya tienes el código).

### Para Desarrollo Móvil
- **Expo Go**: Aplicación móvil para testing en dispositivos reales. Descárgala desde la App Store (iOS) o Google Play (Android).
- **Emuladores/Simulators** (opcional):
  - Android Studio para emulador Android.
  - Xcode para simulador iOS (solo en macOS).

### Sistema Operativo
- Windows, macOS o Linux.
- Para desarrollo iOS: Solo macOS con Xcode instalado.

## Instalación del Proyecto

1. **Navega al directorio raíz del proyecto** (app-repartidor).

2. **Instala las dependencias**:
   ```
   npm install
   ```
   Este comando instalará todas las dependencias listadas en `package.json`, incluyendo Expo, React Native y librerías adicionales como mapas y ubicación.

## Configuración del Entorno

### Variables de Entorno
Si la aplicación requiere configuración adicional (como API keys para mapas o backend), crea un archivo `.env` en la raíz del proyecto con las variables necesarias. Consulta con el equipo de desarrollo para obtener las claves requeridas.

### Configuración de Expo
El archivo `app.json` ya está configurado con:
- Nombre de la app: "MovilRepartidor"
- Orientación: Portrait
- Soporte para iOS, Android y web
- Plugins: expo-router, expo-splash-screen, expo-secure-store

No se requieren cambios adicionales para un arranque básico.

## Ejecución de la Aplicación

### Modo Desarrollo
1. **Inicia el servidor de desarrollo**:
   ```
   npm start
   ```
   o
   ```
   npx expo start
   ```

2. **Opciones de ejecución**:
   - **Expo Go**: Escanea el código QR con la app Expo Go en tu dispositivo móvil.
   - **Emulador Android**: Presiona `a` en la terminal o ejecuta `npm run android`.
   - **Simulador iOS**: Presiona `i` en la terminal o ejecuta `npm run ios` (solo en macOS).
   - **Web**: Presiona `w` en la terminal o ejecuta `npm run web` para ejecutar en el navegador.

### Scripts Disponibles
- `npm start`: Inicia el servidor de desarrollo.
- `npm run android`: Ejecuta en emulador Android.
- `npm run ios`: Ejecuta en simulador iOS.
- `npm run web`: Ejecuta en navegador web.
- `npm run lint`: Ejecuta el linter para verificar código.

## Desarrollo

### Estructura del Proyecto
- `app/`: Directorio principal con rutas (file-based routing con expo-router).
- `assets/`: Imágenes, iconos y recursos estáticos.
- `components/`: Componentes reutilizables de React Native.
- `hooks/`: Hooks personalizados.
- `services/`: Lógica de servicios (API calls, etc.).
- `docs/`: Documentación (este archivo).

### Funcionalidades Clave
- **Mapas**: Integración con react-native-maps para visualización de rutas.
- **Ubicación**: Uso de expo-location para GPS.
- **Navegación**: expo-router para navegación entre pantallas.
- **Almacenamiento Seguro**: expo-secure-store para datos sensibles.

Edita los archivos en `app/` para modificar la aplicación. Los cambios se reflejarán automáticamente con Hot Reload.

## Configuración de la API

Para conectar la aplicación con el backend de la API, es necesario configurar la URL base en el archivo `client/apiClient.ts`.

### Cambiar la URL de la API
1. Abre el archivo `client/apiClient.ts`.
2. Localiza la constante `BASE_URL` (generalmente en la línea 5).
3. Cambia el valor de la URL según tu entorno:
   - La URL del servidor de de desarrollo, por ejemplo `"https://api.tudominioendesarrollo.com/"`.
   - La URL del servidor de producción, por ejemplo `"https://api.tudominio.com/"`.
4. Guarda el archivo.

Ejemplo:
```typescript
const BASE_URL = "https://api.ejemplo.com/";
```

Asegúrate de que la URL termine con `/` y sea accesible desde tu dispositivo o emulador. Si usas un emulador, evita `localhost` y usa la IP de tu máquina.

## Solución de Problemas

### Problemas Comunes
- **Error de dependencias**: Ejecuta `npm install` nuevamente o borra `node_modules` y `package-lock.json` y vuelve a jecutar `npm install`.
- **Problemas con Expo Go**: Asegúrate de que la app Expo Go esté actualizada y en la misma red WiFi.
- **Errores de ubicación/mapas**: Verifica permisos de ubicación en el dispositivo/emulador.
- **Errores de build**: Limpia el cache con `npx expo start --clear`.

### Logs y Debugging
- Revisa la consola de Expo CLI para errores.
- Para debugging avanzado, usa Flipper o React Native Debugger.

### Recursos Adicionales
- [Documentación de Expo](https://docs.expo.dev/)
- [Documentación de React Native](https://reactnative.dev/docs/getting-started)
- [Expo Router](https://docs.expo.dev/router/introduction/)

