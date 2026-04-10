import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product } from '../types/products';

const HISTORY_KEY = '@scan_history';

export interface HistoryItem extends Product {
  scannedAt: string;
}

export const saveToHistory = async (product: Product) => {
  const history = await getHistory();
  const newItem: HistoryItem = {
    ...product,
    scannedAt: new Date().toISOString(),
  };
  // Remove duplicatas do mesmo código (mantém apenas o mais recente)
  const filtered = history.filter(item => item.code !== product.code);
  const updated = [newItem, ...filtered];
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
};

export const getHistory = async (): Promise<HistoryItem[]> => {
  const data = await AsyncStorage.getItem(HISTORY_KEY);
  return data ? JSON.parse(data) : [];
};

export const clearHistory = async () => {
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify([]));
};