import ProductLine from "@/components/ProductLine";
import { Product } from "@/models/product";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useMemo, useState } from "react";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getDeliveryOrderById } from "@/services/deliveryApi";

export default function OrderScreen() {
  const { id } = useLocalSearchParams();
  const orderId = Array.isArray(id) ? id[0] : id;
  const [pedido, setPedido] = useState<{
    id: string;
    orderNumber?: string;
    fechaEntrega: string;
    ubicacion: string;
    direccionCompleta?: string;
    status?: string;
    totalPrice?: number;
    items?: Array<{
      id: number;
      productId: number;
      productName: string;
      quantity: number;
      unitPrice: number;
      subtotal: number;
    }>;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadOrder = async (): Promise<void> => {
      if (!orderId) {
        setError("Pedido no disponible");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const fetchedOrder = await getDeliveryOrderById(orderId);

        if (!isMounted) {
          return;
        }

        setPedido(fetchedOrder);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : "No se pudo cargar el pedido.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadOrder();

    return () => {
      isMounted = false;
    };
  }, [orderId]);

  const items: Product[] = useMemo(() => {
    return (pedido?.items || []).map((item) => ({
      id: item.id,
      name: item.productName,
      image: "",
      status: pedido?.status || "",
      quantity: Number(item.quantity),
      price: Number(item.unitPrice),
    }));
  }, [pedido]);

  const direccion = pedido?.direccionCompleta || pedido?.ubicacion || "Dirección no disponible";

  if (loading) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/coplaca.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.loadingText}>Cargando pedido real...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/coplaca.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/coplaca.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.card}>
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID Pedido: </Text>
            <Text style={styles.infoLabel}>Fecha: </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{pedido?.orderNumber || pedido?.id || orderId}</Text>
            <Text style={styles.infoLabel}>{pedido?.fechaEntrega || "--/--/----"}</Text>
          </View>
          <Text style={styles.infoAddress}>Dirección: {direccion}</Text>
          <Text style={styles.infoEstado}>Estado: {pedido?.status || "No disponible"}</Text>
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={true}>
          {items.length > 0 ? (
            items.map((item: Product) => <ProductLine key={item.id} item={item} />)
          ) : (
            <Text style={styles.emptyItemsText}>Este pedido no tiene productos cargados.</Text>
          )}
        </ScrollView>
        <Text style={styles.total}>Total pedido: {pedido?.totalPrice?.toFixed(2) || "0.00"} €</Text>
      </View>

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
    minHeight: 450,
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
  infoAddress: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    textAlign: "left",
    marginBottom: 8,
  },
  loadingText: {
    textAlign: "center",
    color: "#0A8F3E",
    fontWeight: "bold",
    padding: 24,
  },
  errorText: {
    textAlign: "center",
    color: "#b00020",
    fontWeight: "bold",
    padding: 24,
  },
  emptyItemsText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 10,
    fontWeight: "600",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 8,
  },
});
