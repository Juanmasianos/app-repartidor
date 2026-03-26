export type Pedido = {
  id: string;
  fechaEntrega: string;
  ubicacion: string;
  coordenadas?: {
    latitude: number;
    longitude: number;
  };
};
