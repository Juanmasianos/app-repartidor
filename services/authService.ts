import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'user_session_token';

export const authService = {
  saveToken: async (token: string) => {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  getToken: async () => {
    return await SecureStore.getItemAsync(TOKEN_KEY);
  },
  
  logout: async () => {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
};