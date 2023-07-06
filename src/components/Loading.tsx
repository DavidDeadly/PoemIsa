import { FC } from 'react';
import { View, ViewStyle, ActivityIndicator, StyleProp } from 'react-native';

import { COLORS } from '@/constants';

export const Loading: FC<{ style?: StyleProp<ViewStyle> }> = ({ style }) => {
  return (
    <View style={style} accessibilityLabel="loading-spinner">
      <ActivityIndicator size="large" color={COLORS.MAIN.PRIMARY} />
    </View>
  );
};
