import 'react-native-gesture-handler';
import functions from '@react-native-firebase/functions';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';

import { UserProvider } from '@/components/context';
import { ToastNotifications } from '@/components/context';
import { AppWrapper } from '@/components';
import { HeaderButtonsProvider } from 'react-navigation-header-buttons';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

if (__DEV__) {
  functions().useEmulator('192.168.1.60', 5001);
}

export const queryClient = new QueryClient();

function App(): JSX.Element {
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
