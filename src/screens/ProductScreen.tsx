import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Product } from '../types/products';
import { saveFavorite, removeFavorite, getFavorites } from '../storage/favoritesStorage';

type ProductRouteProp = RouteProp<{ params: { product: Product } }, 'params'>;

export const ProductScreen = () => {
  const route = useRoute<ProductRouteProp>();
  const { product } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    const favorites = await getFavorites();
    setIsFavorite(favorites.some(fav => fav.code === product.code));
  };

  const handleFavorite = async () => {
    if (isFavorite) {
      await removeFavorite(product.code);
      setIsFavorite(false);
      Alert.alert('Removido', 'Produto removido dos favoritos');
    } else {
      await saveFavorite(product);
      setIsFavorite(true);
      Alert.alert('Salvo', 'Produto adicionado aos favoritos');
    }
  };

  const getNutriScoreColor = (grade?: string) => {
    switch (grade?.toLowerCase()) {
      case 'a': return '#2E7D32';
      case 'b': return '#689F38';
      case 'c': return '#F9A825';
      case 'd': return '#F57C00';
      case 'e': return '#D32F2F';
      default: return '#888';
    }
  };

  return (
    <ScrollView style={styles.container}>
      {product.image_url && (
        <Image source={{ uri: product.image_url }} style={styles.image} />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{product.product_name}</Text>
        <Text style={styles.brand}>{product.brands}</Text>
        
        {product.nutriscore_grade && (
          <View style={[styles.nutriBadge, { backgroundColor: getNutriScoreColor(product.nutriscore_grade) }]}>
            <Text style={styles.nutriText}>Nutri-Score: {product.nutriscore_grade.toUpperCase()}</Text>
          </View>
        )}
        
        <Text style={styles.sectionTitle}>Ingredientes:</Text>
        <Text style={styles.ingredients}>
          {product.ingredients_text || 'Informação não disponível'}
        </Text>
        
        <TouchableOpacity style={styles.favoriteButton} onPress={handleFavorite}>
          <Text style={styles.favoriteButtonText}>
            {isFavorite ? '★ Remover dos favoritos' : '☆ Adicionar aos favoritos'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: 200, resizeMode: 'contain' },
  infoContainer: { padding: 16 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  brand: { fontSize: 16, color: '#666', marginBottom: 12 },
  nutriBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 16 },
  nutriText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 8, marginBottom: 8 },
  ingredients: { fontSize: 14, color: '#333', lineHeight: 20 },
  favoriteButton: { backgroundColor: '#FFD700', padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 24, marginBottom: 30 },
  favoriteButtonText: { fontSize: 16, fontWeight: 'bold', color: '#333' },
});