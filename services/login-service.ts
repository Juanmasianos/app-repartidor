import { postData } from './data-service';

export const login = async (email: string, password: string) => {

  const loginData = {
    email: email,
    password: password
  };

  return await postData('auth/login', loginData); 
};