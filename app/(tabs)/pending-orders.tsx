import { Section } from "@/components/Section";
import { PEDIDOS_ACEPTADOS, PEDIDOS_ASIGNADOS } from "@/mocks/ordersMock";
import { Pedido } from "@/models/Order";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function PendingOrdersScreen() {
  const router = useRouter();
  const [asignados, setAsignados] = useState<Pedido[]>(PEDIDOS_ASIGNADOS);
  const [aceptados, setAceptados] = useState<Pedido[]>(PEDIDOS_ACEPTADOS);

  const handleAccept = (order: Pedido) => {
    setAsignados((prev) => prev.filter((p) => p.id !== order.id));
    setAceptados((prev) => [order, ...prev]);
  };

  const handleCardPress = (order: Pedido) => {
    router.push(`/order/${order.id}` as any);
  };

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/coplaca.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </View>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Section
          title="Pedidos Asignados"
          orders={asignados}
          type="asignado"
          onCardPress={handleCardPress}
          onAccept={handleAccept}
        />
        <Section
          title="Pedidos Aceptados"
          orders={aceptados}
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
});
