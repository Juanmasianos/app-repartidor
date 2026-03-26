import { SectionProps } from "@/app/types/sectionProps";
import { Colors } from "@/hooks/colors";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { OrderCard } from "./OrderCard";
import { CARD_WIDTH } from "@/app/constants/width";

export function Section({ title, orders, type, onCardPress }: SectionProps) {
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
})