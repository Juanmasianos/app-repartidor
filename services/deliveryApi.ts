import { PEDIDOS_ACEPTADOS, PEDIDOS_ASIGNADOS } from "@/mocks/ordersMock";
import { Pedido } from "@/models/Order";

declare const process: {
  env: Record<string, string | undefined>;
};

type LoginResponse = {
  token: string;
  type: string;
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
};

type AddressDTO = {
  id?: number;
  street?: string;
  streetNumber?: string;
  apartment?: string;
  city?: string;
  postalCode?: string;
  province?: string;
  additionalInfo?: string;
};

type OrderItemDTO = {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
};

type ApiOrderDTO = {
  id: number;
  orderNumber?: string;
  status?: string;
  totalPrice?: number;
  createdAt?: string;
  estimatedDeliveryTime?: string;
  deliveryAddress?: AddressDTO;
  deliveryAddressLabel?: string;
  items?: OrderItemDTO[];
};

type DeliveryUserDTO = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  warehouseName?: string;
  deliveryStatus?: string;
  enabled?: boolean;
  address?: AddressDTO;
};

let sessionToken: string | null = null;

export function setSessionToken(token: string): void {
  sessionToken = token;
}

export function clearSessionToken(): void {
  sessionToken = null;
}

function getApiBaseUrl(): string {
  return (process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080").replace(/\/$/, "");
}

function buildUrl(path: string): string {
  return `${getApiBaseUrl()}${path}`;
}

function getAuthHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (sessionToken) {
    headers.Authorization = `Bearer ${sessionToken}`;
  }

  return headers;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const text = await response.text();
  const payload = text.length > 0 ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = typeof payload === "string"
      ? payload
      : payload?.message || payload?.error || `Error HTTP ${response.status}`;
    throw new Error(message);
  }

  return payload as T;
}

function normalizeApiOrder(order: ApiOrderDTO): Pedido {
  const orderId = order.orderNumber || `PED-${String(order.id).padStart(5, "0")}`;
  const dateSource = order.estimatedDeliveryTime || order.createdAt || new Date().toISOString();

  return {
    id: orderId,
    orderNumber: order.orderNumber || orderId,
    fechaEntrega: formatDate(dateSource),
    ubicacion: getShortAddress(order),
    direccionCompleta: getFullAddress(order),
    status: order.status || "",
    createdAt: order.createdAt,
    totalPrice: order.totalPrice,
    items: order.items || [],
  };
}

function getShortAddress(order: ApiOrderDTO): string {
  if (order.deliveryAddressLabel && order.deliveryAddressLabel.trim().length > 0) {
    const labelParts = order.deliveryAddressLabel
      .split(",")
      .map((part) => part.trim())
      .filter(Boolean);

    return labelParts.slice(0, 2).join(", ") || order.deliveryAddressLabel.trim();
  }

  const street = order.deliveryAddress?.street?.trim();
  const city = order.deliveryAddress?.city?.trim();
  if (street && city) {
    const streetNumber = order.deliveryAddress?.streetNumber?.trim();
    return [street, streetNumber, city].filter(Boolean).join(", ");
  }

  return order.deliveryAddressLabel || "Ubicacion no disponible";
}

function getFullAddress(order: ApiOrderDTO): string {
  if (order.deliveryAddressLabel && order.deliveryAddressLabel.trim().length > 0) {
    return order.deliveryAddressLabel.trim();
  }

  const address = order.deliveryAddress;
  if (!address) {
    return getShortAddress(order);
  }

  const parts: string[] = [];
  const streetLine = [address.street, address.streetNumber, address.apartment]
    .filter((value): value is string => Boolean(value && value.trim().length > 0))
    .map((value) => value.trim())
    .join(" ");

  if (streetLine.length > 0) {
    parts.push(streetLine);
  }

  if (address.postalCode && address.postalCode.trim().length > 0) {
    parts.push(address.postalCode.trim());
  }

  if (address.city && address.city.trim().length > 0) {
    parts.push(address.city.trim());
  }

  if (address.province && address.province.trim().length > 0) {
    parts.push(address.province.trim());
  }

  if (address.additionalInfo && address.additionalInfo.trim().length > 0) {
    parts.push(address.additionalInfo.trim());
  }

  return parts.length > 0 ? parts.join(", ") : getShortAddress(order);
}

function formatDate(isoValue: string): string {
  const parsedDate = new Date(isoValue);
  if (Number.isNaN(parsedDate.getTime())) {
    return "Fecha no disponible";
  }

  return parsedDate.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function normalizeStatus(status: string | undefined): string {
  return (status || "").trim().toUpperCase();
}

export async function loginDeliveryUser(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(buildUrl("/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const payload = await parseResponse<LoginResponse>(response);
  if (!payload.token) {
    throw new Error("La respuesta de login no incluyo token");
  }

  setSessionToken(payload.token);
  return payload;
}

export async function getCurrentDeliveryUser(): Promise<DeliveryUserDTO> {
  const response = await fetch(buildUrl("/api/v1/users/me"), {
    headers: getAuthHeaders(),
  });

  return parseResponse<DeliveryUserDTO>(response);
}

export async function getDeliveryOrders(): Promise<Pedido[]> {
  const response = await fetch(buildUrl("/api/v1/orders/me"), {
    headers: getAuthHeaders(),
  });

  const payload = await parseResponse<ApiOrderDTO[] | { data?: ApiOrderDTO[] }>(response);
  const orders = Array.isArray(payload) ? payload : payload.data || [];
  return orders.map(normalizeApiOrder);
}

export async function getDeliveryOrderById(orderId: string): Promise<Pedido | null> {
  try {
    const orders = await getDeliveryOrders();
    const foundOrder = orders.find((order) => order.id === orderId);
    if (foundOrder) {
      return foundOrder;
    }
  } catch {
    // Fallback below.
  }

  return (
    PEDIDOS_ASIGNADOS.find((order) => order.id === orderId) ||
    PEDIDOS_ACEPTADOS.find((order) => order.id === orderId) ||
    null
  );
}

export function splitOrdersByStatus(orders: Pedido[]): { assigned: Pedido[]; accepted: Pedido[] } {
  const assigned = orders.filter((order) => normalizeStatus(order.status) === "ASSIGNED");
  const accepted = orders.filter((order) => {
    const status = normalizeStatus(order.status);
    return status === "ACCEPTED" || status === "IN_TRANSIT";
  });

  if (assigned.length === 0 && accepted.length === 0) {
    return {
      assigned: PEDIDOS_ASIGNADOS,
      accepted: PEDIDOS_ACEPTADOS,
    };
  }

  return {
    assigned: assigned.length > 0 ? assigned : PEDIDOS_ASIGNADOS,
    accepted: accepted.length > 0 ? accepted : PEDIDOS_ACEPTADOS,
  };
}