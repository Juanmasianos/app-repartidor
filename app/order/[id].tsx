import ProductLine from "@/components/ProductLine";
import { productsMocks } from "@/mocks/productsMock";
import { Product } from "@/models/product";
import { useLocalSearchParams } from "expo-router";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { Pedido, PEDIDOS_ACEPTADOS } from "../(tabs)/map";

export default function OrderScreen() {

  const items: Product[] = productsMocks;

  const { id } = useLocalSearchParams();

  const pedido = PEDIDOS_ACEPTADOS.find((p) => p.id === id);

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/coplaca.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.card}>
        {/* Info pedido */}
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>ID Pedido: </Text>
            <Text style={styles.infoLabel}>Fecha: </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>{id}</Text>
            <Text style={styles.infoLabel}>{pedido!.fechaEntrega}</Text>
          </View>
          <Text style={styles.infoEstado}>Estado: No puesto</Text>
        </View>

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Lista de productos */}
          {items.map((item: Product) => (
            <ProductLine key={item.id} item={item} >
            </ProductLine>
          ))}
        </ScrollView>
        {/* Total */}
        <Text style={styles.total}>Total pedido</Text>
      </View>

      <View style={{ height: 20 }} />
    </View >
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    paddingTop: 50,
    paddingBottom: 12,
  },
  headerLogo: {
    width: 100,
    height: 100,
    marginBottom: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0A8F3E",
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#4CAF7D",
    borderRadius: 24,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
  },
  infoEstado: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },
  total: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 8,
  },
});
