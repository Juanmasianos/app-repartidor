import { UserDTO } from "@/models/User";

const API_URL = "http://TU_IP:8080/api"; // cámbialo por tu backend real

// 🔹 Obtener todos los usuarios
export const getUsers = async (): Promise<UserDTO[]> => {
  const response = await fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener usuarios");
  }

  return response.json();
};

// 🔹 Obtener un usuario por ID
export const getUserById = async (id: string): Promise<UserDTO> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener el usuario");
  }

  return response.json();
};

// 🔹 Actualizar usuario
export const updateUser = async (
  id: string,
  userData: Partial<UserDTO>,
): Promise<UserDTO> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar el usuario");
  }

  return response.json();
};

// 🔹 Eliminar usuario
export const deleteUser = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar el usuario");
  }
};
