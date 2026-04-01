import { authService } from './auth-service';
import { postData } from './data-service';

export const login = async (email: string, password: string) => {

  const loginData = {
    email: email,
    password: password
  };

  try {
    const response = await postData('auth/login', loginData) as any;
    const token = response.data?.token || 
                  response.headers['authorization']?.replace('Bearer ', '');
    
    const userId = response.data?.id;

    if (token) {
      await authService.saveToken(token);
      if (userId) {
        await authService.saveUserId(userId.toString());
      }
      return true; 
    }

    console.error("Login exitoso en API pero sin token en la respuesta");
    return false;

  } catch (error) {
    console.error("Error en la petición de login:", error);
    throw error; 
  }
};