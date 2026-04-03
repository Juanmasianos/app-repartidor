import { Pedido } from "@/models/Order";

export const PEDIDOS_ASIGNADOS: Pedido[] = [
  {
    id: "PED-00123",
    fechaEntrega: "18/03/2026",
    ubicacion: "Calle El Sol 12, La Laguna",
    direccionCompleta: "Calle El Sol 12, 2º A, 38201 La Laguna, Santa Cruz de Tenerife",
    status: "ASSIGNED",
    totalPrice: 18.6,
    items: [
      { id: 1, productId: 101, productName: "Plátano premium", quantity: 4, unitPrice: 2.3, subtotal: 9.2 },
      { id: 2, productId: 102, productName: "Piña dulce", quantity: 3, unitPrice: 3.13, subtotal: 9.4 },
    ],
  },
  {
    id: "PED-00124",
    fechaEntrega: "19/03/2026",
    ubicacion: "Avda. Trinidad 45, Santa Cruz",
    direccionCompleta: "Avenida de la Trinidad 45, 3º B, 38001 Santa Cruz de Tenerife",
    status: "ASSIGNED",
    totalPrice: 14.95,
    items: [
      { id: 3, productId: 103, productName: "Mango canario", quantity: 5, unitPrice: 2.2, subtotal: 11 },
      { id: 4, productId: 104, productName: "Papaya", quantity: 1, unitPrice: 3.95, subtotal: 3.95 },
    ],
  },
  {
    id: "PED-00125",
    fechaEntrega: "20/03/2026",
    ubicacion: "C/ Heliodoro 8, Puerto de la Cruz",
    direccionCompleta: "Calle Heliodoro Rodríguez López 8, Bajo, 38400 Puerto de la Cruz, Santa Cruz de Tenerife",
    status: "IN_TRANSIT",
    totalPrice: 22.4,
    items: [
      { id: 5, productId: 105, productName: "Aguacate", quantity: 4, unitPrice: 2.8, subtotal: 11.2 },
      { id: 6, productId: 106, productName: "Kiwi", quantity: 3, unitPrice: 3.73, subtotal: 11.19 },
    ],
  },
];

export const PEDIDOS_ACEPTADOS: Pedido[] = [
  {
    id: "PED-00119",
    fechaEntrega: "17/03/2026",
    ubicacion: "C/ Los Majuelos 3, La Orotava",
    direccionCompleta: "Calle Los Majuelos 3, 1º D, 38300 La Orotava, Santa Cruz de Tenerife",
    status: "ACCEPTED",
    totalPrice: 16.8,
    items: [
      { id: 7, productId: 107, productName: "Cereza temprana", quantity: 2, unitPrice: 4.4, subtotal: 8.8 },
      { id: 8, productId: 108, productName: "Níspero", quantity: 4, unitPrice: 2.0, subtotal: 8 },
    ],
  },
  {
    id: "PED-00120",
    fechaEntrega: "17/03/2026",
    ubicacion: "Pol. Ind. Costa Sur, Granadilla",
    direccionCompleta: "Polígono Industrial Costa Sur, Nave 14, 38600 Granadilla de Abona, Santa Cruz de Tenerife",
    status: "ACCEPTED",
    totalPrice: 19.75,
    items: [
      { id: 9, productId: 109, productName: "Mango tommy", quantity: 5, unitPrice: 2.75, subtotal: 13.75 },
      { id: 10, productId: 110, productName: "Pitaya", quantity: 1, unitPrice: 6, subtotal: 6 },
    ],
  },
];