import { ReactNode, createContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { User } from '@/types/models/user';

GoogleSignin.configure({
  webClientId:
    '885622529419-84ri8uebf2lomeejg9tuhb1rv84vf57t.apps.googleusercontent.com'
});

export const UserContext = createContext<User>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  // Handle user state changes
  const onAuthStateChanged = (userRes: User) => {
    setUser(userRes);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
