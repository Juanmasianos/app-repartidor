// voy a necesitar un get y un put
// import { getData, putData } from "./data-service";
// import api from "../client/apiClient";
// import { UserDTO } from "../models/User";
import { UserDTO } from "../models/User";
import { getData, putData } from "./data-service";

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

export const userService = {
  getUserById: async (id: string): Promise<UserDTO> => {
    return await getData<UserDTO>(`/users/${id}`);
  },

  updateUser: async (id: string, data: UpdateUserRequest): Promise<UserDTO> => {
    return await putData<UserDTO>(`/users/${id}`, data);
  },
};

export const getUsers = async (): Promise<UserDTO[]> => {
  return await getData<UserDTO[]>(`/users`);
};
