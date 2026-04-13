import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getHistory, HistoryItem } from '../storage/scanHistoryStorage';
import { useTheme } from '../contexts/themeContext';

export const HistoryScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, [])
  );

  const loadHistory = async () => {
    const data = await getHistory();
    setHistory(data);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const renderItem = ({ item }: { item: HistoryItem }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate('Product', { product: item })}
    >
      <Text style={[styles.name, { color: colors.text }]}>{item.product_name}</Text>
      <Text style={[styles.brand, { color: colors.textSecondary }]}>{item.brands}</Text>
      <Text style={[styles.date, { color: colors.textSecondary }]}>
        Escaneado em: {formatDate(item.scannedAt)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {history.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          Nenhum produto escaneado ainda.
        </Text>
      ) : (
        <FlatList
          data={history}
          keyExtractor={(item) => item.code + item.scannedAt}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16 },
  card: { padding: 16, borderRadius: 12, marginBottom: 12 },
  name: { fontSize: 16, fontWeight: 'bold' },
  brand: { fontSize: 14, marginTop: 4 },
  date: { fontSize: 12, marginTop: 8 },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 16 },
});