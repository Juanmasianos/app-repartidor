import { UserDTO } from "@/models/User";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "user_session_token";
const ID_KEY = "user_id";
const USER_KEY = "user_data";

export const authService = {
  saveToken: async (token: string) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },
  getToken: async () => {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },
  logout: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
    await SecureStore.deleteItemAsync(ID_KEY);
    await SecureStore.deleteItemAsync(USER_KEY);
  },
  saveUserId: async (userId: string) => {
    await SecureStore.setItemAsync(ID_KEY, userId);
  },
  getUserId: async () => {
    return await SecureStore.getItemAsync(ID_KEY);
  },
  saveUserData: async (data: UserDTO) => {
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(data));
  },
  getUserData: async () => {
    const raw = await SecureStore.getItemAsync(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  },
};
