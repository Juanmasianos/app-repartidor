export type UserDTO = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profileImage: string;
    profileInitial: string;
    accountBalance: number;
    address: AddressDTO;
    warehouseId: number;
    warehouseName: string;
    roles: string[];
    deliveryStatus: DeliveryAgentStatus;
    enabled: boolean;
}

export type DeliveryAgentStatus = "AT_WAREHOUSE" | "DELIVERING" | "OFFLINE";

export type AddressDTO = {
    id: number;
    street: string;
    streetNumber: string;
    apartment: string;
    city: string;
    postalCode: string;
    province: string;
    latitude: number;
    longitude: number;
    additionalInfo: string;
    isDefault: boolean;
}
