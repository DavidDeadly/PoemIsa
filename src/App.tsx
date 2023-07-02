import 'react-native-gesture-handler';
import functions from '@react-native-firebase/functions';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';

import { UserProvider } from '@/components/context';
import { ToastNotifications } from '@/components/context';
import { AppWrapper } from '@/components';
import { HeaderButtonsProvider } from 'react-navigation-header-buttons';

if (__DEV__) {
  functions().useEmulator('192.168.1.12', 5001);
}

function App(): JSX.Element {
  return (
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
            <AppWrapper />
          </ToastNotifications>
        </HeaderButtonsProvider>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
