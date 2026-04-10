import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const HomeScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/apple-icon.png')}
        style={{ width: 80, height: 80, marginBottom: 20 }}
      />
      <Text style={styles.title}>NutriScan</Text>
      <Text style={styles.subtitle}>Escaneeie o código de barras e veja informações nutricionais</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Scanner')}>
        <Ionicons name="camera-outline" size={24} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Abrir Câmera</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.buttonOutline]} onPress={() => navigation.navigate('Favorites')}>
        <Ionicons name="heart-outline" size={24} color="#007AFF" style={styles.buttonIcon} />
        <Text style={[styles.buttonText, styles.buttonOutlineText]}>Ver Favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.buttonHistory]} onPress={() => navigation.navigate('History')}>
        <Ionicons name="time-outline" size={24} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Histórico de produtos</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
    width: '80%',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonHistory: {
    backgroundColor: '#FFA500',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  buttonOutlineText: {
    color: '#007AFF',
  },
  buttonIcon: {
    marginRight: 10,
  },
});