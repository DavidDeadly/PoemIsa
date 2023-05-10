import { useContext } from 'react';

import Auth from '@/services/auth';
import { UserContext } from '@/context/UserContext';

export const useUser = () => {
  const user = useContext(UserContext);

  const signOut = () => Auth.signOut();

  const loginWithGoogle = () => Auth.loginWithGoogle();

  return { user, signOut, loginWithGoogle };
};
