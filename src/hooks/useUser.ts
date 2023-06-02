import { useContext } from 'react';

import { Auth } from '@/services';
import { UserContext } from '@/components/context';

export const useUser = () => {
  const { user, loadingUser } = useContext(UserContext);

  const signOut = () => Auth.signOut();

  const loginWithGoogle = () => Auth.loginWithGoogle();

  return { user, loadingUser, signOut, loginWithGoogle };
};
