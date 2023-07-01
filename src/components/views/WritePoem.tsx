import { FC } from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { COLORS } from '@/constants';
import { PoemIsaEditor } from '@/components/PoemIsaEditor';

const AppGradient = {
  start: { x: 0, y: 2 },
  end: { x: 2, y: 0 }
};

export const WritePoem: FC = () => (
  <LinearGradient
    accessibilityLabel="editor"
    colors={Object.values(COLORS.MAIN)}
    style={parentView}
    start={AppGradient.start}
    end={AppGradient.end}>
    <PoemIsaEditor />
  </LinearGradient>
);

const { parentView } = StyleSheet.create({
  parentView: {
    flex: 1
  }
});
