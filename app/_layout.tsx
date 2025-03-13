import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { WeatherContextProvider } from '../app/providers/WeatherContextProvider';
import HomeScreen from '../app/screens/HomeScreen';

import { getTheme } from './services/preferenceService';
import { ThemeContextProvider, useTheme } from './providers/ThemeContextProvider';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {

  // const { theme } = useTheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      initTheme();
    }
  }, [loaded]);

  const initTheme = async ()=>{
    const currentTheme = await getTheme();
    if(!currentTheme){
      
    }
  }

  if (!loaded) {
    return null;
  }

  return (
    <ThemeContextProvider>
      <WeatherContextProvider>
        <HomeScreen />
      </WeatherContextProvider>
      <StatusBar style="auto" />
    </ThemeContextProvider>
  );
}
