/**
 * @format
 */

import 'react-native-url-polyfill/auto';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { EventType } from '@notifee/react-native';

import App from './src/App';
import { name as appName } from './app.json';
import { onMessage } from '@/helpers/notifications';

notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS) {
    console.log('notification pressed', { pressAction });
    await notifee.cancelNotification(notification?.id ?? '');
  }
});

messaging().setBackgroundMessageHandler(onMessage);

AppRegistry.registerComponent(appName, () => App);
