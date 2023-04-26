import { ReactNode, createContext, useEffect, useState } from 'react';

import { User } from '@/types/models/user';
import Auth from '@/services/auth';

export const UserContext = createContext<User>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  const onAuthStateChanged = (userRes: User) => setUser(userRes);

  useEffect(() => {
    const unsubscribe = Auth.onStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
