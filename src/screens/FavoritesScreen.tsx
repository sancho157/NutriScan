import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getFavorites, removeFavorite } from '../storage/favoritesStorage';
import { Product } from '../types/products';

export const FavoritesScreen = ({ navigation }: any) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  const handleRemove = async (product: Product) => {
    Alert.alert('Remover', `Remover ${product.product_name} dos favoritos?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          await removeFavorite(product.code);
          loadFavorites();
        },
      },
    ]);
  };

  const renderItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('Product', { product: item })}
      onLongPress={() => handleRemove(item)}
    >
      <Text style={styles.name}>{item.product_name}</Text>
      <Text style={styles.brand}>{item.brands}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <Text style={styles.emptyText}>Nenhum produto favoritado ainda.</Text>
      ) : (
        <FlatList
          data={favorites}
          keyExtractor={(item) => item.code}
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
  emptyText: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#888' },
});