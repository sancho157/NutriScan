import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';
import { ScannerScreen } from '../screens/ScannerScreen';
import { ProductScreen } from '../screens/ProductScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { HistoryScreen } from '../screens/HistoryScreen';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Início' }} />
        <Stack.Screen name="Scanner" component={ScannerScreen} options={{ title: 'Escanear' }} />
        <Stack.Screen name="Product" component={ProductScreen} options={{ title: 'Detalhes do Produto' }} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Favoritos' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Histórico' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};