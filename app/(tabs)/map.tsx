import { Colors } from "@/hooks/colors";
import { useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = SCREEN_WIDTH;

// ─── Types ────────────────────────────────────────────────────────────────────
export type Pedido = {
  id: string;
  fechaEntrega: string;
  ubicacion: string;
};

// ─── Mock Data ────────────────────────────────────────────────────────────────
const PEDIDOS_ASIGNADOS: Pedido[] = [
  {
    id: "PED-00123",
    fechaEntrega: "18/03/2026",
    ubicacion: "Calle El Sol 12, La Laguna",
  },
  {
    id: "PED-00124",
    fechaEntrega: "19/03/2026",
    ubicacion: "Avda. Trinidad 45, Santa Cruz",
  },
  {
    id: "PED-00125",
    fechaEntrega: "20/03/2026",
    ubicacion: "C/ Heliodoro 8, Puerto de la Cruz",
  },
];

export const PEDIDOS_ACEPTADOS: Pedido[] = [
  {
    id: "PED-00119",
    fechaEntrega: "17/03/2026",
    ubicacion: "C/ Los Majuelos 3, La Orotava",
  },
  {
    id: "PED-00120",
    fechaEntrega: "17/03/2026",
    ubicacion: "Pol. Ind. Costa Sur, Granadilla",
  },
];

// ─── Order Card ───────────────────────────────────────────────────────────────
type OrderCardProps = {
  order: Pedido;
  type: "asignado" | "aceptado";
  onPress: (order: Pedido) => void;
};

function OrderCard({ order, type, onPress }: OrderCardProps) {
  const isAsignado = type === "asignado";

  return (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      {/* Header row */}
      <View style={styles.cardHeader}>
        <View style={styles.cardField}>
          <Text style={styles.fieldLabel}>ID Pedido</Text>
          <Text style={styles.fieldValue}>{order.id}</Text>
        </View>
        <View style={styles.cardField}>
          <Text style={styles.fieldLabel}>Fecha de{"\n"}entrega</Text>
          <Text style={styles.fieldValue}>{order.fechaEntrega}</Text>
        </View>
        <View style={styles.arrowIndicator}>
          <Text style={styles.arrowText}>›</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Location */}
      <View style={styles.locationRow}>
        <Text style={styles.fieldLabel}>Ubicacion</Text>
        <View style={styles.locationValueRow}>
          <Text style={styles.locationText} numberOfLines={1}>
            {order.ubicacion}
          </Text>
        </View>
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={[
          styles.ctaButton,
          isAsignado ? styles.ctaAsignado : styles.ctaAceptado,
        ]}
        onPress={() => onPress(order)}
        activeOpacity={0.8}
      >
        <Text style={styles.ctaText}>
          {isAsignado ? "Aceptar envío" : "Ver detalles del envío"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
type SectionProps = {
  title: string;
  orders: Pedido[];
  type: "asignado" | "aceptado";
  onCardPress: (order: Pedido) => void;
};

function Section({ title, orders, type, onCardPress }: SectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsScrollContent}
        snapToInterval={CARD_WIDTH + 12}
        decelerationRate="fast"
      >
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            type={type}
            onPress={onCardPress}
          />
        ))}
      </ScrollView>
    </View>
  );
}

// ─── Main Screen ──────────────────────────────────────────────────────────────
export default function HomeScreen() {
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

  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: Colors.primary,
    backgroundColor: Colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },
  cardsScrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },

  card: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    padding: 14,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  cardField: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: 11,
    color: "rgba(255,255,255,0.75)",
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 13,
    color: "#FFFFFF",
    fontWeight: "bold",
  },

  arrowIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  arrowText: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    lineHeight: 26,
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.25)",
    marginVertical: 10,
  },

  locationRow: {
    marginBottom: 12,
  },
  locationValueRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  locationText: {
    fontSize: 12,
    color: "#FFFFFF",
    flex: 1,
  },

  ctaButton: {
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaAsignado: {
    backgroundColor: Colors.secondary,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  ctaAceptado: {
    backgroundColor: Colors.primary,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
