export interface UserDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: number;
  profileImage: string;
  AddressDTO: string;
  warehouseId: string;
  warehouseName: string;
}
export interface AddressDTO {
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
