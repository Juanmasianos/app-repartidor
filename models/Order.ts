
export type Pedido = {
  id: string;
  orderNumber?: string;
  fechaEntrega: string;
  ubicacion: string;
  direccionCompleta?: string;
  status?: string;
  createdAt?: string;
  totalPrice?: number;
  items?: Array<{
    id: number;
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }>;
};