import React, { useEffect } from 'react';
import { setupLocalDatabase } from './src/services/localDatabase';
import { AppNavigator } from './src/navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    // Inicializa o banco de dados local quando o app carregar
    setupLocalDatabase().catch(error => {
      console.error('Falha ao inicializar banco de dados:', error);
    });
  }, []);

  return <AppNavigator />;
}