import * as SecureStore from 'expo-secure-store';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const TOKEN_KEY = 'user_session_token';
const ID_KEY = 'user_id';

export const authService = {
  saveToken: async (token: string) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  getToken: async () => {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },
  
  logout: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  },

  saveUserId: async (userId: string) => {
    await SecureStore.setItemAsync(ID_KEY, userId);
  },

  getUserId: async () => {
    return await SecureStore.getItemAsync(ID_KEY);
  }
};