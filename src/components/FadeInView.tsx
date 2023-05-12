import { FC, PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

type FadeInViewProps = PropsWithChildren<{
  styles?: ViewStyle;
  duration: number;
  accessibilityLabel?: string;
}>;

export const FadeInView: FC<FadeInViewProps> = ({
  children,
  styles = {},
  duration,
  accessibilityLabel
}) => {
  return (
    <Animated.View
      accessibilityLabel={accessibilityLabel}
      layout={FadeIn.duration(duration / 4)}
      entering={FadeIn.duration(duration)}
      style={styles}>
      {children}
    </Animated.View>
  );
};
