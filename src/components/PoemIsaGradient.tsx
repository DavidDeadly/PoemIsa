import { COLORS } from '@/constants';
import { FC, PropsWithChildren } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type GradientOritation = { x: number; y: number };

type PoemIsaGradientProps = {
  style?: StyleProp<ViewStyle>;
  label: string;
  gradient: {
    start: GradientOritation;
    end: GradientOritation;
  };
};

export const PoemIsaGradient: FC<PropsWithChildren<PoemIsaGradientProps>> = ({
  style,
  label,
  gradient,
  children
}) => (
  <LinearGradient
    accessibilityLabel={label}
    colors={Object.values(COLORS.MAIN)}
    style={style}
    start={gradient.start}
    end={gradient.end}>
    {children}
  </LinearGradient>
);
