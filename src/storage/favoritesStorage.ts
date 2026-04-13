import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types/products';

const FAVORITES_KEY = '@favorites';

export const saveFavorite = async (product: Product) => {
  const existing = await getFavorites();
  const updated = [product, ...existing.filter(p => p.code !== product.code)];
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
};

export const removeFavorite = async (code: string) => {
  const existing = await getFavorites();
  const filtered = existing.filter(p => p.code !== code);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
};

export const getFavorites = async (): Promise<Product[]> => {
  const data = await AsyncStorage.getItem(FAVORITES_KEY);
  return data ? JSON.parse(data) : [];
};