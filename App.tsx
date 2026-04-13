import React, { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from './src/contexts/themeContext';
import { AppNavigator } from './src/navigation/AppNavigator';

// Mantém a splash screen visível enquanto buscamos recursos (executamos funções)
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Adicione aqui tarefas iniciais, se houver. Por exemplo, carregar fontes.
        // await Font.loadAsync(...);

        // Simula um carregamento de 2 segundos. Ajuste conforme necessário.
        await new Promise(resolve => setTimeout(resolve, 2000));
        // ...
      } catch (e) {
        console.warn(e);
      } finally {
        // Após tudo, indica que o app está pronto para renderizar
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // Oculta a splash screen assim que o layout do app for renderizado
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </View>
  );
}