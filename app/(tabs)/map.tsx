import { Order } from "@/models/Order";
import { AddressDTO } from "@/models/User";
import { getOrderAddress } from "@/services/address-service";
import { getOrdersByDeliverer } from "@/services/order-service";
import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { WebView } from "react-native-webview";

type Coords = { lat: number; lng: number };

const buildSvgPin = (color: string) =>
  `<svg xmlns='http://www.w3.org/2000/svg' width='28' height='40' viewBox='0 0 28 40'>` +
  `<path d='M14 0C6.27 0 0 6.27 0 14c0 9.625 14 26 14 26S28 23.625 28 14C28 6.27 21.73 0 14 0z' fill='${color}'/>` +
  `<circle cx='14' cy='14' r='6' fill='white'/>` +
  `</svg>`;

const buildMarkerJS = (lat: number, lng: number, id: number, info: string) => {
  return `
    L.marker([${lat}, ${lng}], {
      icon: L.divIcon({
        className: '',
        html: \`${buildSvgPin("#16a34a")}\`,
        iconSize: [28, 40], iconAnchor: [14, 40], popupAnchor: [0, -40],
      })
    }).addTo(map).bindPopup('<b>Pedido ${id}</b><br/>${info}');
  `;
};

const buildMapHtml = (location: Coords, markersJS: string) => {
  return `<!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
      <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      <style>* { margin:0; padding:0; } html,body,#map { width:100%; height:100%; }</style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = L.map('map').setView([${location.lat}, ${location.lng}], 12);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
        
        // Marcador del repartidor
        L.marker([${location.lat}, ${location.lng}], {
          icon: L.divIcon({ className: '', html: \`${buildSvgPin("#2563EB")}\`, iconSize: [28,40], iconAnchor: [14,40] })
        }).addTo(map).bindPopup('Tu ubicación');

        // Inyección de marcadores de pedidos
        ${markersJS}
      </script>
    </body>
    </html>`;
};

const LEGEND_ITEMS = [
  { color: "#16a34a", label: "Aceptado" },
  { color: "#2563EB", label: "Tu ubicación" },
];

export default function MapScreen() {
  const [location, setLocation] = useState<Coords | null>(null);
  const [markersHtml, setMarkersHtml] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Obtener ubicación GPS
        const { status } = await Location.requestForegroundPermissionsAsync();
        let currentLoc = { lat: 28.4636, lng: -16.2518 };
        if (status === "granted") {
          const loc = await Location.getCurrentPositionAsync({});
          currentLoc = { lat: loc.coords.latitude, lng: loc.coords.longitude };
        }
        setLocation(currentLoc);

        // 2. Obtener pedidos del repartidor
        const orders = await getOrdersByDeliverer();
        
        // 3. Cruce de datos: Por cada pedido, buscar dirección del cliente
        const markersArray = await Promise.all(
          orders.map(async (order) => {
            const address = await getOrderAddress(order.customerId);
            if (address && address.latitude && address.longitude) {
              return buildMarkerJS(
                address.latitude, 
                address.longitude, 
                order.id, 
                `${address.street} ${address.streetNumber}`
              );
            }
            return "";
          })
        );

        setMarkersHtml(markersArray.join("\n"));
      } catch (error) {
        console.error("Error cargando mapa:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading || !location) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0A8F3E" />
        <Text>Cargando mapa y pedidos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("@/assets/images/coplaca.png")} style={styles.headerLogo} resizeMode="contain" />
      </View>

      <WebView
        style={styles.map}
        originWhitelist={["*"]}
        source={{ html: buildMapHtml(location, markersHtml) }}
        javaScriptEnabled
      />

      <View style={styles.legend}>
        {LEGEND_ITEMS.map(({ color, label }) => (
          <View key={label} style={styles.legendItem}>
            <View style={[styles.dot, { backgroundColor: color }]} />
            <Text style={styles.legendText}>{label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#0A8F3E",
    fontSize: 16,
  },
  header: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: "flex-start",
  },
  headerLogo: {
    width: 130,
    height: 80,
  },
  errorBanner: {
    backgroundColor: "#FEF3C7",
    padding: 8,
    alignItems: "center",
  },
  errorText: {
    color: "#db7e7e",
    fontSize: 13,
  },
  map: {
    flex: 1,
  },
  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendText: {
    fontSize: 13,
    color: "#374151",
  },
});
