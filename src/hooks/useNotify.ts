import { useToast } from 'react-native-toast-notifications';

export const useNotify = () => {
  const toast = useToast();

  const success = (message: string) => {
    toast.show(message, { type: 'success' });
  };

  const error = (message: string) => {
    toast.show(message, { type: 'danger' });
  };

  return {
    success,
    error
  };
};
