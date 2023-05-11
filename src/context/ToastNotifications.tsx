import { COLORS } from '@/constants';
import { Danger, Sun, Warning2 } from 'iconsax-react-native';
import { FC, PropsWithChildren } from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import { StyleSheet } from 'react-native';

export const ToastNotifications: FC<PropsWithChildren> = ({ children }) => {
  const iconsColor = COLORS.toasts.colorIcons;
  const iconsSize = 20;

  return (
    <ToastProvider
      placement="top"
      duration={5000}
      animationType="zoom-in"
      animationDuration={250}
      successColor="green"
      dangerColor="red"
      warningColor="orange"
      normalColor="gray"
      successIcon={<Sun size={iconsSize} color={iconsColor} variant="Broken" />}
      dangerIcon={
        <Danger size={iconsSize} color={iconsColor} variant="Broken" />
      }
      warningIcon={
        <Warning2 size={iconsSize} color={iconsColor} variant="Broken" />
      }
      textStyle={styles.text}
      offset={50}
      offsetTop={30}
      offsetBottom={40}
      swipeEnabled={true}>
      {children}
    </ToastProvider>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
    fontSize: 14
  }
});
