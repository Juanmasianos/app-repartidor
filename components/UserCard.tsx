import { CARD_WIDTH } from "@/app/constants/width";
import { UserCardProps } from "@/app/types/UserCardProps";
import { Colors } from "@/hooks/colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export function UserCard({ user, onPress }: UserCardProps) {
  return (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      {/* Header row */}
      <View style={styles.cardHeader}>
        <View style={styles.cardField}>
          <Text style={styles.fieldLabel}>ID</Text>
          <Text style={styles.fieldValue}>{user.id}</Text>
        </View>
        <View style={styles.cardField}>
          <Text style={styles.fieldLabel}>Nombre</Text>
          <Text style={styles.fieldValue}>
            {user.firstName} {user.lastName}
          </Text>
        </View>
        <View style={styles.arrowIndicator}>
          <Text style={styles.arrowText}>›</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Email */}
      <View style={styles.infoRow}>
        <Text style={styles.fieldLabel}>Email</Text>
        <Text style={styles.infoText} numberOfLines={1}>
          {user.email}
        </Text>
      </View>

      {/* Ubicación */}
      <View style={styles.infoRow}>
        <Text style={styles.fieldLabel}>Almacén</Text>
        <Text style={styles.infoText} numberOfLines={1}>
          {user.warehouseName || "-"}
        </Text>
      </View>

      {/* CTA */}
      <TouchableOpacity
        style={styles.ctaButton}
        onPress={() => onPress(user)}
        activeOpacity={0.8}
      >
        <Text style={styles.ctaText}>Ver detalles</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
  infoRow: {
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: "#FFFFFF",
    marginTop: 2,
  },
  ctaButton: {
    backgroundColor: Colors.primary,
    borderRadius: 30,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  ctaText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
});
