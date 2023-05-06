import { COLORS } from '@/constants';
import { FC } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native';

type ButtonProps = {
  children: React.ReactNode;
} & TouchableOpacityProps;

export const Button: FC<ButtonProps> = ({ style, children, ...props }) => (
  <View style={style}>
    <TouchableOpacity style={styles.button} {...props}>
      {children}
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: COLORS.primary,
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginTop: 20
  }
});
