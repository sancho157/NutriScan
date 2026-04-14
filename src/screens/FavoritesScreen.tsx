import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { getFavorites, removeFavorite } from '../storage/favoritesStorage';
import { Product } from '../types/products';
import { useTheme } from '../contexts/themeContext';

export const FavoritesScreen = ({ navigation }: any) => {
  const { colors } = useTheme();
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
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={() => navigation.navigate('Product', { product: item })}
      onLongPress={() => handleRemove(item)}
    >
      <Text style={[styles.name, { color: colors.text }]}>{item.product_name}</Text>
      <Text style={[styles.brand, { color: colors.textSecondary }]}>{item.brands}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {favorites.length === 0 ? (
        <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
          Nenhum produto favoritado ainda.
        </Text>
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
  container: { flex: 1 },
  list: { padding: 16 },
  card: { padding: 16, borderRadius: 12, marginBottom: 12 },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Inter_700Bold',
  },
  brand: {
    fontSize: 14,
    marginTop: 4,
    fontFamily: 'Inter_400Regular',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    fontFamily: 'Inter_400Regular',
  },
});