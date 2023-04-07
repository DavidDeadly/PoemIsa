import functions from '@react-native-firebase/functions';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabs } from './components/BottomTabs';

if (__DEV__) {
  functions().useEmulator('192.168.1.10', 5001);
}

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <BottomTabs />
    </NavigationContainer>
  );
}

export default App;
