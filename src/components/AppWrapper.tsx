import { Login } from '@/views/Login';
import { BottomTabs } from './BottomTabs';
import { useUser } from '@/hooks/useUser';

export const AppWrapper = () => {
  const { user, loadingUser } = useUser();

  if (loadingUser) {
    return null;
  }

  return !user ? <Login /> : <BottomTabs />;
};
