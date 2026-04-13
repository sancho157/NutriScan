import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Product } from '../types/products';
import { saveFavorite, removeFavorite, getFavorites } from '../storage/favoritesStorage';
import { useTheme } from '../contexts/themeContext';

type ProductRouteProp = RouteProp<{ params: { product: Product } }, 'params'>;

export const ProductScreen = () => {
  const { colors } = useTheme();
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
      case 'a': return colors.nutriA;
      case 'b': return colors.nutriB;
      case 'c': return colors.nutriC;
      case 'd': return colors.nutriD;
      case 'e': return colors.nutriE;
      default: return colors.textSecondary;
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {product.image_url && (
        <Image source={{ uri: product.image_url }} style={styles.image} />
      )}
      <View style={[styles.infoContainer, { backgroundColor: colors.card }]}>
        <Text style={[styles.name, { color: colors.text }]}>{product.product_name}</Text>
        <Text style={[styles.brand, { color: colors.textSecondary }]}>{product.brands}</Text>
        
        {product.nutriscore_grade && (
          <View style={[styles.nutriBadge, { backgroundColor: getNutriScoreColor(product.nutriscore_grade) }]}>
            <Text style={styles.nutriText}>Nutri-Score: {product.nutriscore_grade.toUpperCase()}</Text>
          </View>
        )}
        
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Ingredientes:</Text>
        <Text style={[styles.ingredients, { color: colors.textSecondary }]}>
          {product.ingredients_text || 'Informação não disponível'}
        </Text>
        
        <TouchableOpacity style={[styles.favoriteButton, { backgroundColor: isFavorite ? colors.buttonWarning : colors.buttonPrimary }]} onPress={handleFavorite}>
          <Text style={styles.favoriteButtonText}>
            {isFavorite ? '★ Remover dos favoritos' : '☆ Adicionar aos favoritos'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  image: { width: '100%', height: 200, resizeMode: 'contain' },
  infoContainer: { padding: 16, margin: 16, borderRadius: 12 },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  brand: { fontSize: 16, marginBottom: 12 },
  nutriBadge: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, marginBottom: 16 },
  nutriText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 8, marginBottom: 8 },
  ingredients: { fontSize: 14, lineHeight: 20 },
  favoriteButton: { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 24, marginBottom: 30 },
  favoriteButtonText: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
});