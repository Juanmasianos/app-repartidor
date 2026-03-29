import { CARD_WIDTH } from "@/app/constants/width";
import { SectionProps } from "@/app/types/sectionProps";
import { Colors } from "@/hooks/colors";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { OrderCard } from "./OrderCard";

export function Section({
  title,
  orders,
  type,
  onCardPress,
  onAccept,
}: SectionProps) {
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
            onAccept={onAccept}
          />
        ))}
      </ScrollView>
    </View>
  );
}

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
});
