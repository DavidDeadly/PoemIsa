import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, PermissionsAndroid } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import functions from '@react-native-firebase/functions';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';
import { onMessage } from './helpers/notifications';

import { UserProvider } from '@/components/context';
import { ToastNotifications } from '@/components/context';
import { AppWrapper } from '@/components';
import { HeaderButtonsProvider } from 'react-navigation-header-buttons';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

if (__DEV__) {
  functions().useEmulator('192.168.1.14', 5001);
}

PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

export const queryClient = new QueryClient();

function App(): JSX.Element {
  async function bootstrap() {
    const initialNotification = await notifee.getInitialNotification();

    if (initialNotification) {
      console.log(
        'Notification caused application to open',
        initialNotification.notification
      );
      console.log(
        'Press action used to open the app',
        initialNotification.pressAction
      );
    }
  }

  useEffect(() => {
    bootstrap().finally(() => console.log('Bootstrap finish'));

    const unsubscribe = messaging().onMessage(onMessage);

    messaging()
      .subscribeToTopic('Poems')
      .then(() => console.log('Subscribed to poems topic!'));

    const unsubscribeNotifeeFore = notifee.onForegroundEvent(
      ({ type, detail }) => {
        switch (type) {
          case EventType.DISMISSED:
            console.log('User dismissed notification', detail.notification);
            break;
          case EventType.PRESS:
            console.log('User pressed notification', detail.notification);
            break;
        }
      }
    );

    return () => {
      messaging().unsubscribeFromTopic('Poems');
      unsubscribeNotifeeFore();
      unsubscribe();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <NavigationContainer>
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
