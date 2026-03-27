import { CARD_WIDTH } from "@/app/constants/width";
import { OrderCardProps } from "@/app/types/OrderCardProps";
import { Colors } from "@/hooks/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function OrderCard({ order, type, onPress }: OrderCardProps) {
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
        <Text
          style={[
            styles.ctaText,
            isAsignado ? styles.ctaTextAsignado : styles.ctaTextAceptado,
          ]}
        >
          {isAsignado ? "Aceptar envío" : "Ver detalles del envío"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBG,
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
    color: Colors.primary,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.4,
    marginBottom: 2,
  },
  fieldValue: {
    fontSize: 13,
    color: Colors.textPrimary,
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
    color: Colors.textPrimary,
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
    color: Colors.textPrimary,
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
    borderWidth: 2,
    borderColor: Colors.textPrimary,
  },
  ctaTextAsignado: {
    color: Colors.primary,
  },
  ctaTextAceptado: {
    color: Colors.textPrimary,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: "bold",
  },
});
