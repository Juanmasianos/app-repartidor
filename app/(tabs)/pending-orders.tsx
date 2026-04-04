import { Section } from "@/components/Section";
import { Colors } from "@/hooks/colors";
import { MOCK_ORDERS } from "@/mocks/ordersMock";
import { Order } from "@/models/Order";
import { authService } from "@/services/auth-service";
import { acceptOrder, getOrdersByDeliverer } from "@/services/order-service";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, TouchableOpacity, View, } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { AddressDTO } from "@/models/User";

export default function PendingOrdersScreen() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const data = await getOrdersByDeliverer();

      //mock
      //const data = MOCK_ORDERS;
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.warn("La API no devolvió un array, devolvió:", typeof data);
        setOrders([]);
      }
    } catch (error) {
      console.error("Error cargando pedidos:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCardPress = async (order: Order, type: string) => {
    if (type === "asignado") {
      try {
        await acceptOrder(order.id.toString());
        alert("¡Pedido aceptado! Ahora aparecerá en la sección de Aceptados.");
        fetchOrders();
      } catch (error) {
        alert("No se pudo aceptar el pedido.");
      }
    } else {
      router.push(`/order/${order.id}` as any);
    }
  };

  if (loading) return <ActivityIndicator size="large" color={Colors.primary} style={{ flex: 1 }} />;

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/coplaca.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={fetchOrders} 
            style={styles.refreshButton}>
          <Feather name="refresh-cw" size={20} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Section
          title="Pedidos Asignados"
          orders={orders.filter((order: Order) => order.status === "ASSIGNED")}
          type="asignado"
          onCardPress={handleCardPress}
        />
        <Section
          title="Pedidos Aceptados"
          orders={orders.filter((order: Order) => order.status === "ACCEPTED" || order.status === "IN_TRANSIT")}
          type="aceptado"
          onCardPress={handleCardPress}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginTop: 20,
    flexDirection: "row",
    justifyContent:"space-between",
  },
  headerLogo: {
    width: 130,
    height: 80,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 16,
    paddingBottom: 32,
  },
  refreshButton: {
    marginTop: 25,
    marginRight: 30,
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 40,
  }
});
