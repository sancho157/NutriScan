import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { Camera, CameraView } from 'expo-camera';
import { BarcodeOverlay } from '../components/BarcodeOverlay';
import { useNavigation } from '@react-navigation/native';
import { getProductByBarcode } from '../services/openFoodsFacts';
import { saveToHistory } from '../storage/scanHistoryStorage';

export const ScannerScreen = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation<any>();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }: { data: string }) => {
    if (scanned) return;
    setScanned(true);
    
    const product = await getProductByBarcode(data);
    if (product) {
      await saveToHistory(product);   // <-- linha adicionada
      navigation.navigate('Product', { product });
    } else {
      Alert.alert('Produto não encontrado', 'Código não cadastrado na base de dados.');
    }
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Solicitando permissão da câmera...</Text>;
  }
  if (hasPermission === false) {
    return <Text>Sem acesso à câmera</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['ean13', 'ean8', 'upc_a', 'upc_e'],
        }}
      >
        <BarcodeOverlay />
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
});