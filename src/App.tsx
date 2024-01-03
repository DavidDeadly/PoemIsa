import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import functions from '@react-native-firebase/functions';

import { UserProvider } from '@/components/context';
import { ToastNotifications } from '@/components/context';
import { AppWrapper } from '@/components';
import { HeaderButtonsProvider } from 'react-navigation-header-buttons';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { navigationRef } from './helpers/navigation';

if (__DEV__) {
  functions().useEmulator('192.168.1.14', 5001);
}

export const queryClient = new QueryClient();

function App(): JSX.Element {
  useEffect(() => {
    const getPermission = async () => {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );
    };

    getPermission();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NavigationContainer ref={navigationRef}>
          <HeaderButtonsProvider stackType="native">
            <ToastNotifications>
              <StatusBar
                animated
                translucent
                backgroundColor="transparent"
                barStyle="dark-content"
              />
              <GestureHandlerRootView style={fullScreen}>
                <AppWrapper />
              </GestureHandlerRootView>
            </ToastNotifications>
          </HeaderButtonsProvider>
        </NavigationContainer>
      </UserProvider>
    </QueryClientProvider>
  );
}

const { fullScreen } = StyleSheet.create({
  fullScreen: { flex: 1 }
});

export default App;
