export type OrderItemDTO = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;   // BigDecimal -> number
  unitPrice: number;  // BigDecimal -> number
  subtotal: number;   // BigDecimal -> number
};

export type OrderStatus = 'PENDING' | 'CONFIRMED' | 'ASSIGNED' | 'ACCEPTED' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED';

export type Order = {
  id: number;
  orderNumber: string;
  customerId: number;
  warehouseId: number;
  status: OrderStatus;
  totalPrice: number;
  subtotal: number;
  discount: number;
  deliveryFee: number;
  items: OrderItemDTO[]; 
  deliveryAgentId: number;
  deliveryAgentName: string;
  deliveryAddressId: number;
  estimatedDeliveryTime: string;
  actualDeliveryTime?: string; 
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
};
