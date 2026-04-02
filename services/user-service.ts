// voy a necesitar un get y un put
// import {} from "./data-service";
import api from "../client/apiClient";
import { UserDTO } from "../models/User";

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  password?: string;
  address?: {
    street: string;
    streetNumber: string;
    apartment?: string;
    city: string;
    postalCode: string;
    province: string;
    additionalInfo?: string;
  };
}
export const getUsers = async (): Promise<UserDTO[]> => {
  const response = await api.get<UserDTO[]>("/users");
  return response.data;
};

export const userService = {
  getUsers,
  getUserById: async (id: string): Promise<UserDTO> => {
    const response = await api.get<UserDTO>(`/users/${id}`);
    return response.data;
  },
  updateUser: async (id: string, data: UpdateUserRequest): Promise<UserDTO> => {
    const response = await api.put<UserDTO>(`/users/${id}`, data);
    return response.data;
  },
};
