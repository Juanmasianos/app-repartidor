import ProductLine from "@/components/ProductLine";
import { Colors } from "@/hooks/colors";
import { MOCK_ORDERS } from "@/mocks/ordersMock";
import { productsMocks } from "@/mocks/productsMock";
import { Order } from "@/models/Order";
import { Product } from "@/models/product";
import { deliverOrder, getOrderById } from "@/services/order-service";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

export default function OrderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await getOrderById(id);

        // mock
        //const data = MOCK_ORDERS.find(o => o.id.toString() === id) || null;
        setOrder(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleDeliver = async () => {
    if (!order) return;

    try {
      await deliverOrder(order.id.toString());
      alert("Pedido entregado con éxito");
      router.back(); 
    } catch (error) {
      alert("Error al procesar la entrega");
    }
  };



  if (loading) return <ActivityIndicator size="large" style={{ flex: 1 }} color={Colors.primary} />;

  if (!order) return <View style={styles.wrapper}><Text>No se encontró el pedido</Text></View>;

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/coplaca.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.card}>
        {/* Info pedido */}
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID Pedido: </Text>
            <Text style={styles.infoLabel}>Fecha Entrega: </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{order.id}</Text>
            <Text style={styles.infoLabel}>
              {order.estimatedDeliveryTime || "Pendiente"}
            </Text>
          </View>
          <Text style={styles.infoEstado}>Estado: {order.status}</Text>
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={true}>
          {/* Mapeamos los productos que vienen DENTRO del objeto order */}
          {order.items?.map((item: any) => (
            <ProductLine key={item.id} item={item} />
          ))}
        </ScrollView>

        {/* Total (Calculado o desde la API) */}
        <Text style={styles.total}>
          Total pedido: {order.totalPrice ? `${order.totalPrice}€` : "N/A"}
        </Text>
      </View>

      <Pressable style={styles.ctaButton} onPress={handleDeliver}>
        <Text style={styles.ctaText}>Marcar como entregado</Text>
      </Pressable>

      <View style={{ height: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 12,
  },
  headerLogo: {
    width: 100,
    height: 100,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0A8F3E",
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#4CAF7D",
    borderRadius: 24,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    minHeight: 450
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
  },
  infoEstado: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 8,
  },
  ctaButton: {
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
