import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider, StatusBar } from 'native-base'
import React, { useEffect, useState, useCallback } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthContext } from './app/contexts/AuthContext'
import { LoginNavigator } from './app/navigation/LoginNavigator'
import { theme } from './app/theme/theme'
import './app/utils/initI18n' // Ensure this initializes i18n properly
import { useLocalStorage } from "./app/hooks/useLocalStorage"
import NotificationSetup from './app/components/NotificationSetup'
import i18n from 'i18next'; // Import i18n instance
import { initReactI18next } from 'react-i18next'; // Import initReactI18next if needed
import { setLanguageHeader } from './app/api/api'
import 'react-native-get-random-values';

const client = new QueryClient()

export default function App() {
  const [loggedUser, setLoggedUser] = useState(null)
  const { getItem } = useLocalStorage();
  useEffect(() => {
    getItem('lng').then((lng) => {
      const language = lng || 'en'; // Default to English if no language is stored
      setLanguageHeader(language);
      i18n.changeLanguage(language);
      // console.log(lng);
    });
  }, [])
  return (
    <NativeBaseProvider theme={theme}>
      <QueryClientProvider client={client}>
        <SafeAreaProvider>
          <NavigationContainer>
            <AuthContext.Provider value={{ user: loggedUser, setUser: setLoggedUser }}>
              <NotificationSetup />
              <StatusBar animated={true} backgroundColor={theme.colors.background[400]} barStyle="dark-content" />
              <LoginNavigator />
            </AuthContext.Provider>
          </NavigationContainer>
        </SafeAreaProvider>
      </QueryClientProvider>
    </NativeBaseProvider>
  );
}
