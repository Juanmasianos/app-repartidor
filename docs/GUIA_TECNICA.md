# Guía Técnica - MovilRepartidor

## Visión general

MovilRepartidor es una aplicación móvil Expo/React Native diseñada para repartidores. Su enfoque principal es el flujo de autenticación, la gestión de pedidos y la visualización de la ubicación en un mapa.

## Tecnologías principales

- **Expo** como plataforma de desarrollo.
- **React Native** para UI nativa multiplataforma.
- **expo-router** para navegación basada en archivos.
- **Axios** para llamadas HTTP.
- **expo-secure-store** para almacenamiento seguro de tokens.
- **react-native-webview** para renderizar el mapa con Leaflet.

## Convenciones del proyecto

- Las pantallas se organizan en `app/` según el enrutamiento de `expo-router`.
- Los servicios que realizan llamadas a la API se ubican en `services/`.
- El cliente HTTP está en `client/apiClient.ts`.
- Los datos de usuario y sesión se manejan con `auth-service.ts`.
- Las constantes y mappings de endpoints se definen en `app/constants/apiConstants.ts`.

## Flujo de navegación

- `(auth)/login.tsx`: pantalla de login inicial.
- `(tabs)/pending-orders.tsx`: listado principal de pedidos.
- `order/[id].tsx`: detalle de pedido y acciones de estado.
- `(tabs)/map.tsx`: mapa de ubicación y pedidos.
- `(tabs)/profile.tsx`: perfil del repartidor y logout.

## Código y estilo

- Mantén el uso de funciones asíncronas (`async/await`) en servicios de API.
- Usa `console.log` o `console.error` solo en desarrollo y para debugging puntual.
- Evita lógica compleja en los componentes; deja la mayoría de la lógica en `services/`.
- Usa `StyleSheet.create()` para los estilos de cada componente.

## Autenticación y estado

- El login guarda el token en `expo-secure-store`.
- Las solicitudes no auth usan un interceptor en `apiClient.ts` para agregar el token.
- Si la API responde con `401`, el interceptor redirige automáticamente a la pantalla de login.

## Recomendaciones para el desarrollador

- Si añades nuevas rutas, ubícalas en `app/` y verifica el layout de `expo-router`.
- Para nuevos endpoints, crea funciones en `services/` y reutiliza `data-service.ts`.
- Documenta nuevas rutas y servicios con archivos adicionales en `docs/`.
- Evita referencias a rutas absolutas externas al proyecto `app-repartidor`.
