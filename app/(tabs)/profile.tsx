import { Colors } from "@/hooks/colors";
import { authService } from "@/services/auth-service";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const userData = await authService.getUserData();
      if (!userData) {
        router.replace("/(auth)/login");
        return;
      }
      setUser(userData);
    } catch (error) {
      console.error("Error cargando perfil:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    await authService.logout();
    router.replace("/(auth)/login");
  };

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color={Colors.primary}
        style={{ flex: 1 }}
      />
    );
  }

  return (
    <ScrollView
      style={styles.wrapper}
      contentContainerStyle={{ paddingBottom: 32 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("@/assets/images/coplaca.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>
      </View>

      {/* Card de perfil */}
      <View style={styles.pedidoBox}>
        {/* Avatar + saludo */}
        <View style={styles.headerBox}>
          <Image
            source={require("@/assets/images/ImagenPerfil.png")}
            style={{ width: 100, height: 100 }}
            resizeMode="contain"
          />
          <Text style={styles.greeting}>
            {user ? `¡Hola, ${user.firstName}!` : "¡Aquí tienes tu espacio!"}
          </Text>
        </View>

        {/* Nombre y apellidos */}
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Nombre:</Text>
          <Text style={styles.value}>{user?.firstName ?? "-"}</Text>
          <Text style={styles.label}>Apellidos:</Text>
          <Text style={styles.value}>{user?.lastName ?? "-"}</Text>
        </View>

        {/* Email y rol */}
        <View style={styles.infoBlock}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user?.email ?? "-"}</Text>
          {/* <Text style={styles.label}>Rol:</Text>
          <Text style={styles.value}>
            {user?.roles?.length > 0 ? user.roles.join(", ") : "-"}
          </Text> */}
        </View>

        {/* Botones */}
        <View style={styles.separation}>
          <TouchableOpacity
            style={styles.buttonOne}
            onPress={() => router.replace("/(tabs)/pending-orders" as any)}
          >
            <Text style={styles.buttonText}>Editar información</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonTwo}
            onPress={() => router.replace("/(tabs)/pending-orders" as any)}
          >
            <Text style={styles.buttonText}>Ir a pedidos {">"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonThree} onPress={handleLogout}>
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 50,
    paddingBottom: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 2,
    borderBottomColor: "#0A8F3E",
  },
  headerLeft: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerLogo: {
    width: 80,
    height: 80,
  },
  pedidoBox: {
    margin: 16,
    backgroundColor: "#ffe186",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    padding: 20,
  },
  headerBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 8,
  },
  greeting: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    flexShrink: 1,
  },
  infoBlock: {
    paddingTop: 16,
    paddingHorizontal: 4,
  },
  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#000",
    marginTop: 8,
  },
  value: {
    fontSize: 15,
    color: "#333",
  },
  separation: {
    marginTop: 32,
    gap: 10,
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonOne: {
    backgroundColor: "#01c74d",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonTwo: {
    backgroundColor: "#42d179",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonThree: {
    backgroundColor: "#fd5353",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});
