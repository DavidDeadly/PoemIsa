import { Login } from '@/views/Login';
import { BottomTabs } from './BottomTabs';
import { useUser } from '@/hooks/useUser';

export const AppWrapper = () => {
  const { user } = useUser();

  return !user ? <Login /> : <BottomTabs />;
};
