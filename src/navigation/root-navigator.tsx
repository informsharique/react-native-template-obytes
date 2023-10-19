import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from 'nativewind';
import React, { useEffect } from 'react';

import { useAuth } from '@/core';
import { useIsFirstTime } from '@/core/hooks';
import { Onboarding } from '@/screens';
import { colors } from '@/ui';

import { AuthNavigator } from './auth-navigator';
import { NavigationContainer } from './navigation-container';
import { TabNavigator } from './tab-navigator';
const Stack = createNativeStackNavigator();

export const Root = () => {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === 'dark';
  const hideSplash = React.useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      hideSplash();
    }
  }, [hideSplash, status]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        animation: 'none',
        navigationBarColor: isDark ? colors.charcoal[800] : colors.white,
      }}
    >
      {isFirstTime ? (
        <Stack.Screen name="Onboarding" component={Onboarding} />
      ) : (
        <Stack.Group
          screenOptions={{
            navigationBarColor: isDark ? colors.charcoal[850] : colors.white,
          }}
        >
          {status === 'signOut' ? (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          ) : (
            <Stack.Screen name="App" component={TabNavigator} />
          )}
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Root />
    </NavigationContainer>
  );
};
