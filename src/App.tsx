import { useEffect, useState, createContext } from 'react';
import functions from '@react-native-firebase/functions';
import { NavigationContainer } from '@react-navigation/native';
import { BottomTabs } from './components/BottomTabs';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Login } from './views/Login';
import { User } from './types/models/user';

if (__DEV__) {
  functions().useEmulator('192.168.1.10', 5001);
}

GoogleSignin.configure({
  webClientId:
    '885622529419-84ri8uebf2lomeejg9tuhb1rv84vf57t.apps.googleusercontent.com'
});

export const UserContext = createContext<User>(null);

function App(): JSX.Element {
  const [user, setUser] = useState<User>(null);

  // Handle user state changes
  const onAuthStateChanged = (userRes: User) => {
    console.log({ user: userRes });
    setUser(userRes);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <UserContext.Provider value={user}>
      {!user ? (
        <Login />
      ) : (
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      )}
    </UserContext.Provider>
  );
}

export default App;
