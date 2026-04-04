# Guía de Servicios - MovilRepartidor

## Propósito de la capa de servicios

La capa de servicios abstrae las llamadas a la API y la lógica de negocio fuera de los componentes de UI. Esto facilita pruebas, reutilización y mantenimiento.

## Componentes principales

- `services/auth-service.ts`
  - Almacena y recupera token, userId y datos del usuario.
  - Usa `expo-secure-store` para mantener la sesión segura.
  - Ofrece `logout` para limpiar la sesión.

- `services/data-service.ts`
  - Contiene funciones genéricas: `getData`, `postData`, `putData`, `deleteData`.
  - Todas usan el cliente Axios configurado en `client/apiClient.ts`.

- `services/order-service.ts`
  - Provee funciones específicas de pedidos (`getOrdersByDeliverer`, `getOrderById`, `acceptOrder`, `inTransitOrder`, `deliverOrder`).
  - Usa los mappings definidos en `app/constants/apiConstants.ts`.

- `services/login-service.ts`
  - Maneja el proceso de login y la obtención del token.
  - Guarda datos del usuario tras el login exitoso.

## Uso recomendado

- Si necesitas un nuevo endpoint, primero agrega el mapping correspondiente en `app/constants/apiConstants.ts`.
- Implementa la llamada en `data-service.ts` si es una petición estándar.
- Crea un servicio específico si hay lógica de negocio asociada.
- Evita mezclar lógica de UI con peticiones HTTP dentro de los componentes.

## Manejo de errores

- Los servicios deben capturar errores y devolver valores consistentes.
- Para funciones que realizan cambios de estado, lanza el error después de registrarlo si el componente debe manejarlo.
- Para lecturas, puedes devolver un valor seguro (`[]`, `null`) cuando la API falle.

## Buenas prácticas

- Reutiliza `getData`, `postData`, `putData` y `deleteData`.
- Mantén la responsabilidad de cada servicio clara: un servicio por recurso o dominio.
- No guardes datos sensibles en estado de componente si ya existen en `SecureStore`.
- Usa `authService.getUserId()` para construir endpoints dependientes del repartidor.
