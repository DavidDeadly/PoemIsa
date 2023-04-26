import functions from '@react-native-firebase/functions';
import { NavigationContainer } from '@react-navigation/native';

import { UserProvider } from '@/context/UserContext';
import { AppWrapper } from '@/components/AppWrapper';

if (__DEV__) {
  functions().useEmulator('192.168.1.10', 5001);
}

function App(): JSX.Element {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppWrapper />
      </NavigationContainer>
    </UserProvider>
  );
}

export default App;
