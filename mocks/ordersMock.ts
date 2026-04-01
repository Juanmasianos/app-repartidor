import { Order } from "@/models/Order";

export const MOCK_ORDERS: Order[] = [
  {
    id: 1,
    orderNumber: "ORD-2024-001",
    customerId: 50,
    warehouseId: 1,
    status: 'PENDING', // Aparecerá en "Pedidos Asignados"
    totalPrice: 45.50,
    subtotal: 40.00,
    discount: 0,
    deliveryFee: 5.50,
    deliveryAgentId: 10,
    deliveryAgentName: "Juan Repartidor",
    deliveryAddressId: 88, // Ojo: tu tipo dice number, no string
    estimatedDeliveryTime: "2024-05-20T14:30:00",
    paymentMethod: "CARD",
    paymentStatus: "PAID",
    createdAt: "2024-05-20T10:00:00",
    updatedAt: "2024-05-20T10:05:00",
    items: [
      {
        id: 10,
        productId: 501,
        productName: "Caja de Plátanos Canarios",
        quantity: 2,
        unitPrice: 15.00,
        subtotal: 30.00
      },
      {
        id: 11,
        productId: 502,
        productName: "Papaya Premium",
        quantity: 1,
        unitPrice: 10.00,
        subtotal: 10.00
      }
    ]
  },
  {
    id: 2,
    orderNumber: "ORD-2024-002",
    customerId: 51,
    warehouseId: 1,
    status: 'SHIPPED', // Aparecerá en "Pedidos Aceptados"
    totalPrice: 25.00,
    subtotal: 20.00,
    discount: 0,
    deliveryFee: 5.00,
    deliveryAgentId: 10,
    deliveryAgentName: "Juan Repartidor",
    deliveryAddressId: 99,
    estimatedDeliveryTime: "2024-05-20T16:00:00",
    paymentMethod: "CASH",
    paymentStatus: "PENDING",
    createdAt: "2024-05-20T11:00:00",
    updatedAt: "2024-05-20T11:30:00",
    items: [
      {
        id: 12,
        productId: 505,
        productName: "Aguacate Hass",
        quantity: 5,
        unitPrice: 4.00,
        subtotal: 20.00
      }
    ]
  }
];