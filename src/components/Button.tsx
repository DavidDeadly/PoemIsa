import { COLORS } from '@/constants';
import { IconProps } from 'iconsax-react-native';
import { FunctionComponent } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View
} from 'react-native';

type ButtonProps = {
  Icon?: FunctionComponent<IconProps>;
  text: string;
} & TouchableOpacityProps;

export const Button = ({ style, Icon, text, ...props }: ButtonProps) => (
  <View style={style}>
    <TouchableOpacity style={styles.button} {...props}>
      {Icon && <Icon size="25" color={COLORS.secondary} />}
      <Text style={styles.buttonText}>{text}</Text>
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
  },
  buttonText: {
    color: '#fff'
  }
});
