# MovilRepartidor

Aplicación móvil desarrollada con Expo y React Native para repartidores. Permite gestionar entregas, visualizar rutas en mapas y acceder a funcionalidades de ubicación GPS.

## Características Principales

- Gestión de pedidos y entregas
- Visualización de los pedidos en mapa
- Seguimiento de ubicación
- Navegación intuitiva

## Estructura de la aplicación

- `app/`: pantallas y rutas de la aplicación.
- `assets/`: recursos estáticos como imágenes e iconos.
- `client/`: cliente HTTP y configuración de API.
- `components/`: componentes reutilizables de UI.
- `docs/`: documentación de usuario y guías.
- `hooks/`: hooks personalizados.
- `models/`: modelos de datos y tipos.
- `services/`: lógica de negocio y llamadas a la API.
- `app.json`: configuración general de Expo.
- `package.json`: scripts y dependencias del proyecto.

## Requisitos

- Node.js (versión 18 o superior)
- npm o Yarn
- Expo CLI

## Instalación

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Configura la URL de la API en `client/apiClient.ts` (consulta la guía de arranque para detalles).

## Ejecución

Inicia la aplicación en modo desarrollo:
```bash
npm start
```

Opciones disponibles:
- Expo Go en dispositivo móvil
- Emulador Android
- Simulador iOS
- Navegador web

## Guías de usuario

- [Guía de Arranque](docs/GUIA_ARRANQUE.md)
- [Guía de Login](docs/GUIA_LOGIN.md)
- [Guía de Pedidos](docs/GUIA_PEDIDOS.md)
- [Guía de Detalle de Pedido](docs/GUIA_DETALLE_PEDIDO.md)
- [Guía de Mapa](docs/GUIA_MAPA.md)
- [Guía de Perfil](docs/GUIA_PERFIL.md)

## Guías técnicas

- [Guía Técnica](docs/GUIA_TECNICA.md)
- [Guía de Servicios](docs/GUIA_SERVICIOS.md)

## Más Información

- [Documentación de Expo](https://docs.expo.dev/)
- [React Native](https://reactnative.dev/)
