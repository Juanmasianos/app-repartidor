import { Section } from "@/components/Section";
import { Colors } from "@/hooks/colors";
import { UserDTO } from "@/models/User";
import { getUsers } from "@/services/user-service";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

export default function UsersScreen() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<UserDTO[]>([]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getUsers();

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.warn("La API no devolvió un array:", typeof data);
        setUsers([]);
      }
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCardPress = (user: UserDTO) => {
    router.push(`/user/${user.id}` as any);
  };

  if (loading)
    return (
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={{ flex: 1 }}
      />
    );

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
          title="Lista de Usuarios"
          data={users}
          type="user"
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
});
