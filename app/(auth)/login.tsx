import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { loginDeliveryUser } from "@/services/deliveryApi";

export default function LoginScreen() {
  const router = useRouter();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (): Promise<void> => {
    setError("");

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setError("Introduce email y contraseña.");
      return;
    }

    try {
      setLoading(true);
      const response = await loginDeliveryUser(loginEmail.trim(), loginPassword);

      if (!response.roles?.includes("DELIVERY")) {
        setError("Esta app solo admite cuentas de repartidor.");
        return;
      }

      router.replace("/(tabs)/pending-orders" as any);
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "No se pudo iniciar sesion.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/Fondo-Hojas-Platanera.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/coplaca.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.title}>Repartidores</Text>
          <Text style={styles.subtitle}> Iniciar sesión</Text>

          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="Tu email"
            value={loginEmail}
            onChangeText={setLoginEmail}
            style={styles.input}
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            placeholder="*************"
            value={loginPassword}
            onChangeText={setLoginPassword}
            style={styles.input}
            placeholderTextColor="#999"
            secureTextEntry
          />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>{loading ? "Accediendo..." : "Entrar"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  logoContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    borderWidth: 4,
    borderColor: "#FFC107",
  },
  logoImage: { width: "80%", height: "80%" },
  card: {
    width: "100%",
    backgroundColor: "rgba(0, 128, 0, 0.7)",
    padding: 25,
    borderRadius: 25,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 20,
    color: "#FFC107",
    fontWeight: "bold",
  },
  label: { marginBottom: 5, color: "black", fontWeight: "bold" },
  input: {
    backgroundColor: "#fff",
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 15,
    borderWidth: 3,
    borderColor: "#FFC107",
  },
  button: {
    backgroundColor: "#0A8F3E",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "#FFF3B0",
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  switchText: {
    textAlign: "center",
    marginTop: 15,
    color: "#FFC107",
  },
  switchLink: {
    fontWeight: "bold",
    color: "#FFC107",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },
});
