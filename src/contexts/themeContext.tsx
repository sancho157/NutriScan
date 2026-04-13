import React, { createContext, useState, useContext, useEffect } from 'react';
import { useColorScheme } from 'react-native';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: typeof lightColors;
}

const lightColors = {
  background: '#F2F2F7',
  card: '#FFFFFF',
  text: '#000000',
  textSecondary: '#3C3C43',
  border: '#C6C6C8',
  buttonPrimary: '#0A84FF',
  buttonSuccess: '#34C759',
  buttonWarning: '#FF9F0A',
  nutriA: '#2E7D32',
  nutriB: '#689F38',
  nutriC: '#F9A825',
  nutriD: '#F57C00',
  nutriE: '#D32F2F',
};

const darkColors = {
  background: '#000000',
  card: '#1C1C1E',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  border: '#38383A',
  buttonPrimary: '#0A84FF',
  buttonSuccess: '#30D158',
  buttonWarning: '#FF9F0A',
  nutriA: '#4CAF50',
  nutriB: '#8BC34A',
  nutriC: '#FFC107',
  nutriD: '#FF9800',
  nutriE: '#F44336',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState<Theme>(systemScheme || 'light');

  useEffect(() => {
    setTheme(systemScheme || 'light');
  }, [systemScheme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const colors = theme === 'light' ? lightColors : darkColors;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};