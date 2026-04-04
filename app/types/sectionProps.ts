import { Order } from "../../models/Order";

export type SectionProps = {
  title: string;
  orders: Order[];
  type: "asignado" | "aceptado"; 
  onCardPress: (order: Order, type: string) => void; 
};
