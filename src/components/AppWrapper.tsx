import { PoemIsaStack } from '@/components/navigators';
import { Login } from '@/components/views';
import { useUser } from '@/hooks';
import { FC } from 'react';

export const AppWrapper: FC = () => {
  const { user, loadingUser } = useUser();

  if (loadingUser) {
    return null;
  }

  return !user ? <Login /> : <PoemIsaStack />;
};
