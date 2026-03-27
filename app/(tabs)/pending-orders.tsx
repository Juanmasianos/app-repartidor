import { Section } from "@/components/Section";
import { PEDIDOS_ACEPTADOS, PEDIDOS_ASIGNADOS } from "@/mocks/ordersMock";
import { Pedido } from "@/models/Order";
import { useRouter } from "expo-router";
import { Image, ScrollView, StyleSheet, View } from "react-native";
export default function PendingOrdersScreen() {
  const router = useRouter();

  const handleCardPress = (order: Pedido) => {
    router.push(`/order/${order.id}` as any);
  };

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
        <Section
          title="Pedidos Asignados"
          orders={PEDIDOS_ASIGNADOS}
          type="asignado"
          onCardPress={handleCardPress}
        />
        <Section
          title="Pedidos Aceptados"
          orders={PEDIDOS_ACEPTADOS}
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
    // backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 16,

    // alignItems: "flex-start",
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
