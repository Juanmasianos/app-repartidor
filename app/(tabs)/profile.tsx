import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { clearSessionToken, getCurrentDeliveryUser } from "@/services/deliveryApi";

export default function ProfileScreen() {
  const router = useRouter();
  const [profile, setProfile] = useState<{
    firstName: string;
    lastName: string;
    email: string;
    warehouseName?: string;
    deliveryStatus?: string;
  } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadProfile = async (): Promise<void> => {
      try {
        const currentUser = await getCurrentDeliveryUser();

        if (!isMounted) {
          return;
        }

        setProfile(currentUser);
      } catch (loadError) {
        if (!isMounted) {
          return;
        }

        setError(loadError instanceof Error ? loadError.message : "No se pudo cargar el perfil.");
      }
    };

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = (): void => {
    clearSessionToken();
    router.replace("/(auth)/login" as any);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Image
            source={require("@/assets/images/coplaca.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>
      </View>

      <View style={styles.pedidoBox}>
        <View style={styles.headerBox}>
          <Image
            source={require("@/assets/images/ImagenPerfil.png")}
            style={{
              width: 100,
              height: 100,
            }}
            resizeMode="contain"
          />
          <Text style={styles.textpedido}> ¡Aquí tienes tu espacio!</Text>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        <View style={styles.textpedidoOne}>
          <Text style={styles.textpedido}>Nombre: {profile?.firstName || "-"}</Text>
          <Text style={styles.textpedido}>Apellidos: {profile?.lastName || "-"}</Text>
        </View>
        <View style={styles.textpedidoOne}>
          <Text style={styles.textpedido}>Email: {profile?.email || "-"}</Text>
          <Text style={styles.textpedido}>Almacén: {profile?.warehouseName || "Sin asignar"}</Text>
          <Text style={styles.textpedido}>Estado: {profile?.deliveryStatus || "Sin estado"}</Text>
        </View>

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

          <TouchableOpacity
            style={styles.buttonThree}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Cerrar sesión</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ height: 20 }} />

      {/** height no funciona, averiguar para que sirve */}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#fff" },
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
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerLogo: {
    width: 40,
    height: 40,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#0A8F3E",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#0A8F3E",
    fontWeight: "bold",
  },

  pedidoBox: {
    margin: 16,
    backgroundColor: "#FFC107",
    borderRadius: 20,
    padding: 20,
    height: 600,
  },
  headerBox: {
    display: "flex",
    flexDirection: "row",
  },
  textpedido: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "bold",
    marginRight: 50,
  },
  textpedidoOne: {
    paddingTop: 20,
    padding: 20,
  },
  errorText: {
    color: "#7a0000",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },
  separation: {
    marginTop: 40,
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
    marginTop: 10,
  },
  buttonTwo: {
    backgroundColor: "#42d179",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonThree: {
    backgroundColor: "#fd5353",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});
