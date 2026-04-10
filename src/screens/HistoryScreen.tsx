import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getHistory, HistoryItem } from '../storage/scanHistoryStorage';

export const HistoryScreen = ({ navigation }: any) => {
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
      style={styles.card}
      onPress={() => navigation.navigate('Product', { product: item })}
    >
      <Text style={styles.name}>{item.product_name}</Text>
      <Text style={styles.brand}>{item.brands}</Text>
      <Text style={styles.date}>Escaneado em: {formatDate(item.scannedAt)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {history.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum produto escaneado ainda.</Text>
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
  container: { flex: 1, backgroundColor: '#fff' },
  list: { padding: 16 },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  name: { fontSize: 16, fontWeight: 'bold' },
  brand: { fontSize: 14, color: '#666', marginTop: 4 },
  date: { fontSize: 12, color: '#999', marginTop: 8 },
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#888' },
});