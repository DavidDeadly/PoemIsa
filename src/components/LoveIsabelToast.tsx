import { COLORS } from '@/constants';
import { StyleSheet, Text, View } from 'react-native';
import { ToastProps } from 'react-native-toast-notifications/lib/typescript/toast';

export const LoveIsabelToast = (toast: ToastProps) => {
  return (
    <View style={container}>
      <Text style={[text, title]}>TE AMOOOOOO!!!</Text>
      <Text style={[text, content]}>{toast.message}</Text>
    </View>
  );
};

const { container, title, content, text } = StyleSheet.create({
  container: {
    backgroundColor: `${COLORS.MAIN.PRIMARY}80`,
    padding: 15,
    borderRadius: 10,
    margin: 2
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20
  },
  content: {
    marginTop: 10,
    fontStyle: 'italic'
  },
  text: {
    color: 'pink',
    textAlign: 'center'
  }
});
