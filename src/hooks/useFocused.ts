import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import { focusManager } from 'react-query';

export const useFocused = () => {
  const isFocused = useIsFocused();

  useEffect(() => {
    const subscription = AppState.addEventListener(
      'change',
      status =>
        Platform.OS !== 'web' &&
        isFocused &&
        focusManager.setFocused(status === 'active')
    );

    focusManager.setFocused(isFocused);
    return () => subscription.remove();
  }, [isFocused]);
};
