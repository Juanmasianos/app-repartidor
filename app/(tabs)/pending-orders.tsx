import { Section } from "@/components/Section";
import { Colors } from "@/hooks/colors";
import { Pedido } from "@/models/Order";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getDeliveryOrders, splitOrdersByStatus } from "@/services/deliveryApi";

export default function PendingOrdersScreen() {
  const router = useRouter();
  const [assignedOrders, setAssignedOrders] = useState<Pedido[]>([]);
  const [acceptedOrders, setAcceptedOrders] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleCardPress = (order: Pedido) => {
    router.push(`/order/${order.id}` as any);
  };

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async (): Promise<void> => {
      try {
        setLoading(true);
        setError("");
        const orders = await getDeliveryOrders();
        const splitOrders = splitOrdersByStatus(orders);

        if (!isMounted) {
          return;
        }

        setAssignedOrders(splitOrders.assigned);
        setAcceptedOrders(splitOrders.accepted);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : "No se pudieron cargar los pedidos.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <View style={styles.background}>
      {/* ── Header con logo ── */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/coplaca.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </View>

      {/* ── Contenido ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {loading ? <Text style={styles.loadingText}>Cargando pedidos reales...</Text> : null}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <Section
          title="Pedidos Asignados"
          orders={assignedOrders}
          type="asignado"
          onCardPress={handleCardPress}
        />
        <Section
          title="Pedidos Aceptados"
          orders={acceptedOrders}
          type="aceptado"
          onCardPress={handleCardPress}
        />
      </ScrollView>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  header: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 16,

    alignItems: "flex-start",
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
  loadingText: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    color: Colors.textSecondary,
    fontWeight: "600",
  },
  errorText: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    color: "#B00020",
    fontWeight: "600",
  },
});
