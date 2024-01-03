/**
 * @format
 */

import 'react-native-url-polyfill/auto';
import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

import App from './src/App';
import { name as appName } from './app.json';
import * as navigation from '@/helpers/navigation';
import { notificationsEventHandler, onMessage } from '@/helpers/notifications';

notifee.onBackgroundEvent(async ({ type, detail }) =>
  notificationsEventHandler({ type, detail, navigate: navigation.navigate })
);

messaging().setBackgroundMessageHandler(onMessage);

AppRegistry.registerComponent(appName, () => App);
