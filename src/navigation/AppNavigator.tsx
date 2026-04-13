import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/themeContext';

import { ScannerScreen } from '../screens/ScannerScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { HistoryScreen } from '../screens/HistoryScreen';
import { StatisticsScreen } from '../screens/StatisticsScreen';

const ScannerStack = createNativeStackNavigator();
function ScannerStackScreen() {
  return (
    <ScannerStack.Navigator>
      <ScannerStack.Screen name="ScannerMain" component={ScannerScreen} options={{ title: 'Escanear' }} />
      <ScannerStack.Screen name="Product" component={ProductScreen} options={{ title: 'Detalhes' }} />
    </ScannerStack.Navigator>
  );
}

const FavoritesStack = createNativeStackNavigator();
function FavoritesStackScreen() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="FavoritesMain" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
    </FavoritesStack.Navigator>
  );
}

const HistoryStack = createNativeStackNavigator();
function HistoryStackScreen() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen name="HistoryMain" component={HistoryScreen} options={{ title: 'Histórico' }} />
    </HistoryStack.Navigator>
  );
}

const StatisticsStack = createNativeStackNavigator();
function StatisticsStackScreen() {
  return (
    <StatisticsStack.Navigator>
      <StatisticsStack.Screen name="StatisticsMain" component={StatisticsScreen} options={{ title: 'Estatísticas' }} />
    </StatisticsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  const { colors } = useTheme();

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'camera-outline';
            if (route.name === 'Scanner') iconName = focused ? 'camera' : 'camera-outline';
            else if (route.name === 'Favoritos') iconName = focused ? 'heart' : 'heart-outline';
            else if (route.name === 'Histórico') iconName = focused ? 'time' : 'time-outline';
            else if (route.name === 'Estatísticas') iconName = focused ? 'stats-chart' : 'stats-chart-outline';
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: colors.buttonPrimary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Scanner" component={ScannerStackScreen} />
        <Tab.Screen name="Favoritos" component={FavoritesStackScreen} />
        <Tab.Screen name="Histórico" component={HistoryStackScreen} />
        <Tab.Screen name="Estatísticas" component={StatisticsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};