import { Pedido } from "@/models/Order";

export type SectionProps = {
  title: string;
  orders: Pedido[];
  type: "asignado" | "aceptado";
  onCardPress: (order: Pedido) => void;
};