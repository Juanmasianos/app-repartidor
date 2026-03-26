import { Pedido } from "@/models/Order";

export const PEDIDOS_ASIGNADOS: Pedido[] = [
  {
    id: "PED-00123",
    fechaEntrega: "18/03/2026",
    ubicacion: "Calle El Sol 12, La Laguna",
    coordenadas: { latitude: 28.4874, longitude: -16.3159 },
  },
  {
    id: "PED-00124",
    fechaEntrega: "19/03/2026",
    ubicacion: "Avda. Trinidad 45, Santa Cruz",
    coordenadas: { latitude: 28.4636, longitude: -16.2518 },
  },
  {
    id: "PED-00125",
    fechaEntrega: "20/03/2026",
    ubicacion: "C/ Heliodoro 8, Puerto de la Cruz",
    coordenadas: { latitude: 28.4136, longitude: -16.548 },
  },
];

export const PEDIDOS_ACEPTADOS: Pedido[] = [
  {
    id: "PED-00119",
    fechaEntrega: "17/03/2026",
    ubicacion: "C/ Los Majuelos 3, La Orotava",
    coordenadas: { latitude: 28.3908, longitude: -16.5231 },
  },
  {
    id: "PED-00120",
    fechaEntrega: "17/03/2026",
    ubicacion: "Pol. Ind. Costa Sur, Granadilla",
    coordenadas: { latitude: 28.1167, longitude: -16.5833 },
  },
];
