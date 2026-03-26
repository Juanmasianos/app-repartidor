import { Pedido } from "@/models/Order";


export type OrderCardProps = {
  order: Pedido;
  type: "asignado" | "aceptado";
  onPress: (order: Pedido) => void;
};