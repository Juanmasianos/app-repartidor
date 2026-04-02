import { currentApiVersion, ordersMapping } from '@/app/constants/apiConstants';
import { Order } from '../models/Order';
import { authService } from './auth-service';
import { getData, putData } from './data-service';

export const getOrdersByDeliverer = async () => {

  try {
    const currentUserId = await authService.getUserId();
    const response = await getData(`${currentApiVersion}${ordersMapping}/delivery-agent/${currentUserId}`) as any;

    const orders = Array.isArray(response) ? response : response.data.data; 

    console.log("Pedidos extraídos para la UI:", orders.length);
    return orders as Order[];

  } catch (error: any) {
    console.error("--- DEBUG ERROR EN SERVICIO ---");
    console.error("Status:", error.response.status);
    return [];
  }

};

export const getOrderById = async (id: string): Promise<Order | null> => {
  try {
    const response = await getData(`${currentApiVersion}${ordersMapping}/${id}`) as any;
    return response?.data.data || null;
  } catch (error) {
    console.error("Error al obtener detalle:", error);
    return null;
  }
};

export const acceptOrder = async (orderId: string) => {
  try {
    const response = await putData(`${currentApiVersion}${ordersMapping}/${orderId}/accept`, {});
    return response;
  } catch (error) {
    console.error("Error al aceptar pedido:", error);
    throw error;
  }
};

export const deliverOrder = async (orderId: string) => {
  try {
    const response = await putData(`${currentApiVersion}${ordersMapping}/${orderId}/deliver`, {});
    return response;
  } catch (error) {
    console.error("Error al entregar pedido:", error);
    throw error;
  }
};