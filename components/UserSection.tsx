import { CARD_WIDTH } from "@/app/constants/width";
import { Colors } from "@/hooks/colors";
import { UserDTO } from "@/models/User";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { UserCard } from "./UserCard";

type UserSectionProps = {
  title: string;
  data: UserDTO[];
  onCardPress: (user: UserDTO) => void;
};

export function UserSection({ title, data, onCardPress }: UserSectionProps) {
  const hasUsers = data && data.length > 0;

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {hasUsers ? (
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsScrollContent}
          snapToInterval={CARD_WIDTH + 12}
          decelerationRate="fast"
        >
          {data.map((user) => (
            <UserCard key={user.id} user={user} onPress={onCardPress} />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No hay usuarios disponibles</Text>
        </View>
      )}
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
});
