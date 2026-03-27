import { PEDIDOS_ACEPTADOS, PEDIDOS_ASIGNADOS } from "@/mocks/ordersMock";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

export default function MapScreen() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null,
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permiso de ubicación denegado");
        setLocation({ lat: 28.4636, lng: -16.2518 });
        return;
      }
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setLocation({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude,
      });
    })();
  }, []);

  if (!location) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0A8F3E" />
        <Text style={styles.loadingText}>Obteniendo ubicación…</Text>
      </View>
    );
  }

  const allOrders = [
    ...PEDIDOS_ASIGNADOS.map((p) => ({ ...p, tipo: "asignado" })),
    ...PEDIDOS_ACEPTADOS.map((p) => ({ ...p, tipo: "aceptado" })),
  ];

  const markersJS = allOrders
    .filter((p) => p.coordenadas)
    .map((p) => {
      const color = p.tipo === "asignado" ? "orange" : "green";
      return `
        L.marker([${p.coordenadas!.latitude}, ${p.coordenadas!.longitude}], {
          icon: L.divIcon({
            className: '',
            html: '<div style="width:14px;height:14px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 0 4px rgba(0,0,0,0.4)"></div>',
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          })
        }).addTo(map).bindPopup('<b>Pedido ${p.id}</b><br/>${p.ubicacion}');
      `;
    })
    .join("\n");

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html, body, #map { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = L.map('map').setView([${location.lat}, ${location.lng}], 11);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap'
        }).addTo(map);

        // Marcador de ubicación actual
        L.marker([${location.lat}, ${location.lng}], {
          icon: L.divIcon({
            className: '',
            html: '<div style="width:16px;height:16px;border-radius:50%;background:#2563EB;border:3px solid white;box-shadow:0 0 6px rgba(0,0,0,0.5)"></div>',
            iconSize: [16, 16],
            iconAnchor: [8, 8],
          })
        }).addTo(map).bindPopup('<b>Tu ubicación</b>');

        ${markersJS}
      </script>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/coplaca.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
      </View>

      {errorMsg && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>⚠️ {errorMsg}</Text>
        </View>
      )}

      <WebView
        style={styles.map}
        originWhitelist={["*"]}
        source={{ html }}
        javaScriptEnabled
      />

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: "orange" }]} />
          <Text style={styles.legendText}>Asignado</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: "green" }]} />
          <Text style={styles.legendText}>Aceptado</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.dot, { backgroundColor: "#2563EB" }]} />
          <Text style={styles.legendText}>Tu ubicación</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 12, color: "#0A8F3E", fontSize: 16 },
  header: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "flex-start",
  },
  headerLogo: { width: 130, height: 80 },
  errorBanner: {
    backgroundColor: "#FEF3C7",
    padding: 8,
    alignItems: "center",
  },
  errorText: { color: "#db7e7e", fontSize: 13 },
  map: { flex: 1 },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  legendItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  dot: { width: 12, height: 12, borderRadius: 6 },
  legendText: { fontSize: 13, color: "#374151" },
});
