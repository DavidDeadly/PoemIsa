import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { COLORS } from '@/constants';
import { FC } from 'react';

export type SavePoem = () => void;

type Props = {
  savePoem: SavePoem;
};

export const SavePoemButton: FC<Props> = ({ savePoem }) => (
  <TouchableOpacity onPress={savePoem} style={button}>
    <Text style={text}>Continuar</Text>
  </TouchableOpacity>
);

const { button, text } = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 10,
    backgroundColor: `${COLORS.MAIN.PRIMARY}50`
  },
  text: {
    color: COLORS.MAIN.PRIMARY,
    fontWeight: '900',
    fontSize: 18
  }
});
