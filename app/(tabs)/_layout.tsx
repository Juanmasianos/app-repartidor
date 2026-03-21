import { Tabs } from 'expo-router';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import { Colors } from '@/hooks/colors';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: Colors.primary },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="pedidos-pendientes"
        options={{
          tabBarActiveTintColor: Colors.secondary,
          tabBarInactiveTintColor: Colors.textSecondary,
          tabBarIcon: () => <Feather name="shopping-cart" size={24} color={Colors.secondary} />,
        }}
      />
      <Tabs.Screen
        name="pedido"
        options={{
          tabBarActiveTintColor: Colors.secondary,
          tabBarInactiveTintColor: Colors.textSecondary,
          tabBarIcon: () => <Feather name="shopping-cart" size={24} color={Colors.secondary} />,
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          tabBarActiveTintColor: Colors.secondary,
          tabBarInactiveTintColor: Colors.textSecondary,
          tabBarIcon: () => <Feather name="user" size={24} color={Colors.secondary} />,
        }}
      />
    </Tabs>
  );
}
