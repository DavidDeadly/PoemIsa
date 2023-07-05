import { FC } from 'react';
import { View, ViewStyle, ActivityIndicator } from 'react-native';

import { COLORS } from '@/constants';

export const Loading: FC<{ styles?: ViewStyle }> = ({ styles }) => {
  return (
    <View style={styles} accessibilityLabel="loading-spinner">
      <ActivityIndicator size="large" color={COLORS.MAIN.PRIMARY} />
    </View>
  );
};
