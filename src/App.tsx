import 'react-native-gesture-handler';
import functions from '@react-native-firebase/functions';
import { NavigationContainer } from '@react-navigation/native';

import { UserProvider } from '@/context/UserContext';
import { AppWrapper } from '@/components/AppWrapper';
import { ToastNotifications } from './context/ToastNotifications';

if (__DEV__) {
  functions().useEmulator('192.168.1.10', 5001);
}

function App(): JSX.Element {
  return (
    <UserProvider>
      <NavigationContainer>
        <ToastNotifications>
          <AppWrapper />
        </ToastNotifications>
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
