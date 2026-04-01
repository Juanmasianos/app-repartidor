import { SectionProps } from "@/app/types/sectionProps";
import { Colors } from "@/hooks/colors";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { OrderCard } from "./OrderCard";
import { CARD_WIDTH } from "@/app/constants/width";

export function Section({ title, orders, type, onCardPress }: SectionProps) {
  const hasOrders = orders && orders.length > 0;
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {hasOrders ? (
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
      ) : (
        /* ── Mensaje cuando la lista está vacía ── */
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>
            No hay pedidos {type === "asignado" ? "asignados" : "aceptados"}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
  emptyCard: {
    marginHorizontal: 16,
    padding: 70,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#EEE",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    color: "#999",
    fontSize: 14,
    fontStyle: "italic",
  },
})