import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';

import { store } from './src/store/store';
import { AppNavigator } from './src/navigation/AppNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { SettingsProvider } from './src/context/SettingsContext';

export default function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <ThemeProvider>
          <SettingsProvider>
            <AuthProvider>
              <NavigationContainer>
                <View style={styles.container}>
                  <StatusBar style="auto" />
                  <AppNavigator />
                </View>
              </NavigationContainer>
            </AuthProvider>
          </SettingsProvider>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});