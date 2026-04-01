import { Order } from "@/models/Order";


export type OrderCardProps = {
  order: Order;
  type: "asignado" | "aceptado";
  onPress: (order: Order) => void;
};