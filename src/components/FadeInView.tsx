import { FC, PropsWithChildren } from 'react';
import { ViewStyle } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

type FadeInViewProps = PropsWithChildren<{
  styles?: ViewStyle;
  duration: number;
}>;

export const FadeInView: FC<FadeInViewProps> = ({
  children,
  styles = {},
  duration
}) => {
  return (
    <Animated.View entering={FadeIn.duration(duration)} style={styles}>
      {children}
    </Animated.View>
  );
};
