import { Tabs } from 'expo-router';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Colors } from '@/hooks/colors';
import { View } from 'react-native';

export default function TabLayout() {

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: { backgroundColor: Colors.primary },
          headerShown: false,
        }}>
        <Tabs.Screen
          name="pending-orders"
          options={{
            title: 'Pedidos Pendientes',
            tabBarActiveTintColor: Colors.secondary,
            tabBarInactiveTintColor: Colors.textSecondary,
            tabBarIcon: () => <MaterialCommunityIcons name="truck-delivery-outline" size={28} color={Colors.secondary} />,
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            tabBarActiveTintColor: Colors.secondary,
            tabBarInactiveTintColor: Colors.textSecondary,
            tabBarIcon: () => <Feather name="map-pin" size={24} color={Colors.secondary} />,
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
    </>
  );
}
