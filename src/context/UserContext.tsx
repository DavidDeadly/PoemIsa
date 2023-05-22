import {
  FC,
  PropsWithChildren,
  createContext,
  useEffect,
  useState
} from 'react';

import { User } from '@/types/models/user';
import Auth from '@/services/auth';

export type UserContextType = {
  user: User;
  loadingUser: boolean;
};
export const UserContext = createContext<UserContextType>({
  user: null,
  loadingUser: true
});

export const UserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const onAuthStateChanged = (userRes: User) => {
    setUser(userRes);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = Auth.onStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        loadingUser: loading
      }}>
      {children}
    </UserContext.Provider>
  );
};
