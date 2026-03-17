import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#009B48" },
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () => <IconSymbol size={28} name="house.fill" color={"#FED000"} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: () => <IconSymbol size={28} name="paperplane.fill" color={"#FED000"} />,
        }}
      />
    </Tabs>
  );
}
