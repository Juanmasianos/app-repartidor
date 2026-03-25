import * as Location from "expo-location";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, {
  Callout,
  Marker,
  Polyline,
  PROVIDER_GOOGLE,
} from "react-native-maps";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

const COLORS = {
  verde: "#2E7D32",
  verdeCard: "#388E3C",
  verdeDark: "#1B5E20",
  amarillo: "#FFC107",
  blanco: "#FFFFFF",
  fondo: "#F5F5F5",
  texto: "#212121",
  textoSuave: "#757575",
  overlay: "rgba(0,0,0,0.45)",
  sombra: "rgba(0,0,0,0.18)",
};

// ─── Types ───────────────────────────────────────────────────────────────────
type EstadoPedido = "asignado" | "aceptado" | "entregado";

type Pedido = {
  id: string;
  fechaEntrega: string;
  ubicacion: string;
  estado: EstadoPedido;
  coordenadas: { latitude: number; longitude: number };
};

type Almacen = {
  id: string;
  nombre: string;
  direccion: string;
  coordenadas: { latitude: number; longitude: number };
  stock: number;
};

//─── Imitación de base de datos ──────────────────
const PEDIDOS: Pedido[] = [
  {
    id: "PED-00123",
    fechaEntrega: "18/03/2026",
    ubicacion: "Calle El Sol 12, La Laguna",
    estado: "asignado",
    coordenadas: { latitude: 28.4853, longitude: -16.3167 },
  },
  {
    id: "PED-00124",
    fechaEntrega: "19/03/2026",
    ubicacion: "Avda. Trinidad 45, Santa Cruz",
    estado: "asignado",
    coordenadas: { latitude: 28.4636, longitude: -16.2518 },
  },
  {
    id: "PED-00125",
    fechaEntrega: "20/03/2026",
    ubicacion: "C/ Heliodoro 8, Puerto de la Cruz",
    estado: "asignado",
    coordenadas: { latitude: 28.4142, longitude: -16.5494 },
  },
  {
    id: "PED-00119",
    fechaEntrega: "17/03/2026",
    ubicacion: "C/ Los Majuelos 3, La Orotava",
    estado: "aceptado",
    coordenadas: { latitude: 28.3907, longitude: -16.5229 },
  },
  {
    id: "PED-00120",
    fechaEntrega: "17/03/2026",
    ubicacion: "Pol. Ind. Costa Sur, Granadilla",
    estado: "aceptado",
    coordenadas: { latitude: 28.1237, longitude: -16.5697 },
  },
];

const ALMACENES: Almacen[] = [
  {
    id: "ALM-01",
    nombre: "Almacén Central",
    direccion: "Pol. Ind. Güímar, Tenerife",
    coordenadas: { latitude: 28.3121, longitude: -16.4028 },
    stock: 1240,
  },
  {
    id: "ALM-02",
    nombre: "Almacén Norte",
    direccion: "Pol. La Campana, La Laguna",
    coordenadas: { latitude: 28.5012, longitude: -16.338 },
    stock: 874,
  },
];

const ESTADO_CONFIG: Record<
  EstadoPedido,
  { color: string; label: string; emoji: string }
> = {
  asignado: { color: "#F59E0B", label: "Asignado", emoji: "📋" },
  aceptado: { color: "#3B82F6", label: "Aceptado", emoji: "✅" },
  entregado: { color: "#10B981", label: "Entregado", emoji: "🎉" },
};

// ─── Marcador personalizado: Pedido ──────────────────────────────────────────
function MarkerPedido({
  estado,
  activo,
}: {
  estado: EstadoPedido;
  activo: boolean;
}) {
  const { color } = ESTADO_CONFIG[estado];
  return (
    <View style={[markerStyles.pedidoContainer, activo && markerStyles.activo]}>
      <View
        style={[
          markerStyles.pedidoBubble,
          {
            backgroundColor: color,
            borderColor: activo ? COLORS.amarillo : COLORS.blanco,
          },
        ]}
      >
        <Text style={markerStyles.pedidoEmoji}>📦</Text>
      </View>
      <View style={[markerStyles.pin, { borderTopColor: color }]} />
    </View>
  );
}

// ─── Marcador personalizado: Almacén ─────────────────────────────────────────
function MarkerAlmacen({ activo }: { activo: boolean }) {
  return (
    <View
      style={[markerStyles.almacenContainer, activo && markerStyles.activo]}
    >
      <View
        style={[
          markerStyles.almacenBubble,
          { borderColor: activo ? COLORS.amarillo : COLORS.blanco },
        ]}
      >
        <Text style={markerStyles.almacenEmoji}>🏭</Text>
      </View>
      <View style={markerStyles.pinVerde} />
    </View>
  );
}

const markerStyles = StyleSheet.create({
  pedidoContainer: { alignItems: "center" },
  almacenContainer: { alignItems: "center" },
  activo: { transform: [{ scale: 1.2 }] },
  pedidoBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 6,
  },
  almacenBubble: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: COLORS.verde,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2.5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 6,
  },
  pedidoEmoji: { fontSize: 20 },
  almacenEmoji: { fontSize: 22 },
  pin: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    marginTop: -1,
  },
  pinVerde: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: COLORS.verde,
    marginTop: -1,
  },
});

// ─── Tarjeta inferior: Pedido ─────────────────────────────────────────────────
function TarjetaPedido({
  pedido,
  activo,
  onPress,
}: {
  pedido: Pedido;
  activo: boolean;
  onPress: () => void;
}) {
  const { color, label, emoji } = ESTADO_CONFIG[pedido.estado];
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[tarjetaStyles.card, activo && tarjetaStyles.cardActivo]}
    >
      <View style={tarjetaStyles.topRow}>
        <Text style={tarjetaStyles.id}>{pedido.id}</Text>
        <View
          style={[
            tarjetaStyles.badge,
            { backgroundColor: color + "22", borderColor: color },
          ]}
        >
          <Text style={[tarjetaStyles.badgeText, { color }]}>
            {emoji} {label}
          </Text>
        </View>
      </View>
      <Text style={tarjetaStyles.ubicacion} numberOfLines={1}>
        {pedido.ubicacion}
      </Text>
      <Text style={tarjetaStyles.fecha}>📅 {pedido.fechaEntrega}</Text>
    </TouchableOpacity>
  );
}

// ─── Tarjeta inferior: Almacén ────────────────────────────────────────────────
function TarjetaAlmacen({
  almacen,
  activo,
  onPress,
}: {
  almacen: Almacen;
  activo: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        tarjetaStyles.card,
        tarjetaStyles.cardAlmacen,
        activo && tarjetaStyles.cardActivo,
      ]}
    >
      <View style={tarjetaStyles.topRow}>
        <Text style={tarjetaStyles.id}>{almacen.nombre}</Text>
        <View
          style={[
            tarjetaStyles.badge,
            { backgroundColor: COLORS.verde + "22", borderColor: COLORS.verde },
          ]}
        >
          <Text style={[tarjetaStyles.badgeText, { color: COLORS.verde }]}>
            🏭 Almacén
          </Text>
        </View>
      </View>
      <Text style={tarjetaStyles.ubicacion} numberOfLines={1}>
        {almacen.direccion}
      </Text>
      <Text style={tarjetaStyles.fecha}>
        📦 Stock: {almacen.stock.toLocaleString()} uds.
      </Text>
    </TouchableOpacity>
  );
}

const tarjetaStyles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.blanco,
    borderRadius: 14,
    padding: 14,
    width: 220,
    marginRight: 10,
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  cardAlmacen: { width: 240 },
  cardActivo: {
    borderColor: COLORS.amarillo,
    shadowOpacity: 0.2,
    elevation: 8,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  id: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.texto,
    flex: 1,
    marginRight: 6,
  },
  badge: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
  },
  badgeText: { fontSize: 10, fontWeight: "700" },
  ubicacion: { fontSize: 12, color: COLORS.textoSuave, marginBottom: 4 },
  fecha: { fontSize: 11, color: COLORS.textoSuave },
});

// ─── Pantalla principal: Mapa ─────────────────────────────────────────────────
type FiltroActivo = "todos" | "pedidos" | "almacenes";

export default function MapScreen() {
  const mapRef = useRef<MapView>(null);

  const [ubicacionActual, setUbicacionActual] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [seleccionadoId, setSeleccionadoId] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<FiltroActivo>("todos");
  const [rutaVisible, setRutaVisible] = useState(false);

  // Animación del panel inferior
  const panelAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return;
      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setUbicacionActual({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
    })();
  }, []);

  useEffect(() => {
    Animated.spring(panelAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 80,
      friction: 12,
    }).start();
  }, []);

  const irA = (
    coordenadas: { latitude: number; longitude: number },
    id: string,
  ) => {
    setSeleccionadoId(id);
    mapRef.current?.animateToRegion(
      { ...coordenadas, latitudeDelta: 0.025, longitudeDelta: 0.025 },
      700,
    );
  };

  const centrarEnMi = () => {
    if (!ubicacionActual) return;
    mapRef.current?.animateToRegion(
      { ...ubicacionActual, latitudeDelta: 0.04, longitudeDelta: 0.04 },
      700,
    );
  };

  // Ruta simulada entre almacén principal → pedidos aceptados → mi ubicación
  const rutaCoordenadas = [
    ALMACENES[0].coordenadas,
    ...PEDIDOS.filter((p) => p.estado === "aceptado").map((p) => p.coordenadas),
    ...(ubicacionActual ? [ubicacionActual] : []),
  ];

  const pedidosFiltrados = filtro !== "almacenes" ? PEDIDOS : [];
  const almacenesFiltrados = filtro !== "pedidos" ? ALMACENES : [];

  const FILTROS: { key: FiltroActivo; label: string }[] = [
    { key: "todos", label: "Todos" },
    { key: "pedidos", label: "📦 Pedidos" },
    { key: "almacenes", label: "🏭 Almacenes" },
  ];

  return (
    <View style={styles.container}>
      {/* ── Mapa ── */}
      <MapView
        ref={mapRef}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        style={styles.mapa}
        showsUserLocation
        showsMyLocationButton={false}
        initialRegion={{
          latitude: 28.35,
          longitude: -16.44,
          latitudeDelta: 0.55,
          longitudeDelta: 0.55,
        }}
      >
        {/* Ruta */}
        {rutaVisible && rutaCoordenadas.length > 1 && (
          <Polyline
            coordinates={rutaCoordenadas}
            strokeColor={COLORS.amarillo}
            strokeWidth={4}
            lineDashPattern={[12, 6]}
          />
        )}

        {/* Marcadores de Almacenes */}
        {almacenesFiltrados.map((alm) => (
          <Marker
            key={alm.id}
            coordinate={alm.coordenadas}
            tracksViewChanges={false}
            onPress={() => irA(alm.coordenadas, alm.id)}
          >
            <MarkerAlmacen activo={seleccionadoId === alm.id} />
            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.calloutTitulo}>🏭 {alm.nombre}</Text>
                <Text style={styles.calloutSub}>{alm.direccion}</Text>
                <Text style={styles.calloutStock}>
                  Stock: {alm.stock.toLocaleString()} uds.
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}

        {/* Marcadores de Pedidos */}
        {pedidosFiltrados.map((ped) => (
          <Marker
            key={ped.id}
            coordinate={ped.coordenadas}
            tracksViewChanges={false}
            onPress={() => irA(ped.coordenadas, ped.id)}
          >
            <MarkerPedido
              estado={ped.estado}
              activo={seleccionadoId === ped.id}
            />
            <Callout tooltip>
              <View style={styles.callout}>
                <Text style={styles.calloutTitulo}>📦 {ped.id}</Text>
                <Text style={styles.calloutSub}>{ped.ubicacion}</Text>
                <Text style={styles.calloutFecha}>📅 {ped.fechaEntrega}</Text>
                <View
                  style={[
                    styles.calloutBadge,
                    { backgroundColor: ESTADO_CONFIG[ped.estado].color },
                  ]}
                >
                  <Text style={styles.calloutBadgeText}>
                    {ESTADO_CONFIG[ped.estado].emoji}{" "}
                    {ESTADO_CONFIG[ped.estado].label}
                  </Text>
                </View>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.filtrosContainer}>
        <View style={styles.filtrosPill}>
          {FILTROS.map((f) => (
            <TouchableOpacity
              key={f.key}
              onPress={() => setFiltro(f.key)}
              style={[
                styles.filtroBtn,
                filtro === f.key && styles.filtroBtnActivo,
              ]}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.filtroText,
                  filtro === f.key && styles.filtroTextActivo,
                ]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.botonesFlotantes}>
        <TouchableOpacity
          style={styles.botonFlotante}
          onPress={centrarEnMi}
          activeOpacity={0.85}
        >
          <Text style={styles.botonFlotanteIcono}>📍</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.botonFlotante,
            rutaVisible && styles.botonFlotanteActivo,
          ]}
          onPress={() => setRutaVisible((v) => !v)}
          activeOpacity={0.85}
        >
          <Text style={styles.botonFlotanteIcono}>🗺</Text>
        </TouchableOpacity>
      </View>

      <Animated.View
        style={[
          styles.panel,
          {
            transform: [
              {
                translateY: panelAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [200, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.panelHandle} />

        <View style={styles.leyenda}>
          {(
            Object.entries(ESTADO_CONFIG) as [
              EstadoPedido,
              (typeof ESTADO_CONFIG)[EstadoPedido],
            ][]
          ).map(([key, cfg]) => (
            <View key={key} style={styles.leyendaItem}>
              <View
                style={[styles.leyendaDot, { backgroundColor: cfg.color }]}
              />
              <Text style={styles.leyendaTexto}>{cfg.label}</Text>
            </View>
          ))}
          <View style={styles.leyendaItem}>
            <View
              style={[styles.leyendaDot, { backgroundColor: COLORS.verde }]}
            />
            <Text style={styles.leyendaTexto}>Almacén</Text>
          </View>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tarjetasScroll}
        >
          {almacenesFiltrados.map((alm) => (
            <TarjetaAlmacen
              key={alm.id}
              almacen={alm}
              activo={seleccionadoId === alm.id}
              onPress={() => irA(alm.coordenadas, alm.id)}
            />
          ))}
          {pedidosFiltrados.map((ped) => (
            <TarjetaPedido
              key={ped.id}
              pedido={ped}
              activo={seleccionadoId === ped.id}
              onPress={() => irA(ped.coordenadas, ped.id)}
            />
          ))}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

// ─── estilos ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: { flex: 1 },
  mapa: { flex: 1 },

  callout: {
    backgroundColor: COLORS.blanco,
    borderRadius: 12,
    padding: 12,
    minWidth: 180,
    maxWidth: 240,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  calloutTitulo: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.texto,
    marginBottom: 3,
  },
  calloutSub: { fontSize: 11, color: COLORS.textoSuave, marginBottom: 3 },
  calloutFecha: { fontSize: 11, color: COLORS.textoSuave, marginBottom: 6 },
  calloutStock: { fontSize: 12, color: COLORS.verde, fontWeight: "600" },
  calloutBadge: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  calloutBadgeText: { fontSize: 11, fontWeight: "700", color: COLORS.blanco },

  // Filtros
  filtrosContainer: {
    position: "absolute",
    top: Platform.OS === "ios" ? 56 : 16,
    alignSelf: "center",
  },
  filtrosPill: {
    flexDirection: "row",
    backgroundColor: COLORS.blanco,
    borderRadius: 30,
    padding: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  filtroBtn: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 26 },
  filtroBtnActivo: { backgroundColor: COLORS.verde },
  filtroText: { fontSize: 12, fontWeight: "600", color: COLORS.textoSuave },
  filtroTextActivo: { color: COLORS.amarillo },

  botonesFlotantes: {
    position: "absolute",
    right: 14,
    bottom: 220,
    gap: 10,
  },
  botonFlotante: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.blanco,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.18,
    shadowRadius: 6,
    elevation: 6,
  },
  botonFlotanteActivo: { backgroundColor: COLORS.verde },
  botonFlotanteIcono: { fontSize: 22 },

  panel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.blanco,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    paddingTop: 10,
    paddingBottom: Platform.OS === "ios" ? 28 : 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 12,
  },
  panelHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#DDD",
    alignSelf: "center",
    marginBottom: 10,
  },

  leyenda: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 12,
    gap: 14,
    flexWrap: "wrap",
  },
  leyendaItem: { flexDirection: "row", alignItems: "center", gap: 5 },
  leyendaDot: { width: 10, height: 10, borderRadius: 5 },
  leyendaTexto: { fontSize: 11, color: COLORS.textoSuave, fontWeight: "500" },

  tarjetasScroll: {
    paddingHorizontal: 16,
    paddingBottom: 4,
  },
});
