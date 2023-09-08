import { COLORS } from '@/constants';
import { HALF_SCREEN } from '@/constants/screens';
import { useSideMenuStyles } from '@/hooks/useSideMenuStyles';
import React, { FC, PropsWithChildren } from 'react';
import {
  StatusBar,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

type GradientOrientation = { x: number; y: number };

type LeftMenuComponentType =
  | React.ComponentType<any>
  | React.ReactElement
  | null;

type PoemIsaGradientProps = {
  style?: StyleProp<ViewStyle>;
  label: string;
  gradient: {
    start: GradientOrientation;
    end: GradientOrientation;
  };
  LeftMenuComponent?: LeftMenuComponentType;
  LeftMenuComponentStyle?: StyleProp<ViewStyle>;
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const PoemIsaGradient: FC<PropsWithChildren<PoemIsaGradientProps>> = ({
  style,
  label,
  gradient,
  children,
  LeftMenuComponent,
  LeftMenuComponentStyle
}) => {
  const { panGestureHandler, mainScreenAnimatedStyles, leftMenuAnimatedStyles } =
    useSideMenuStyles();

  if (!LeftMenuComponent) {
    return (
      <AnimatedLinearGradient
        accessibilityLabel={label}
        colors={Object.values(COLORS.MAIN)}
        style={[style, mainScreenAnimatedStyles, gradientContainer]}
        start={gradient.start}
        end={gradient.end}>
        {children}
      </AnimatedLinearGradient>
    );
  }

  return (
    <View style={container}>
      <PanGestureHandler onGestureEvent={panGestureHandler}>
        <AnimatedLinearGradient
          accessibilityLabel={label}
          colors={Object.values(COLORS.MAIN)}
          style={[style, mainScreenAnimatedStyles, gradientContainer]}
          start={gradient.start}
          end={gradient.end}>
          {children}
        </AnimatedLinearGradient>
      </PanGestureHandler>
      <Animated.View
        style={[
          defaultSideMenu,
          leftMenuAnimatedStyles,
          LeftMenuComponentStyle
        ]}>
        {React.isValidElement(LeftMenuComponent) && LeftMenuComponent}
      </Animated.View>
    </View>
  );
};

const { container, defaultSideMenu, gradientContainer } = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.MAIN.SECONDARY
  },
  gradientContainer: {
    borderRadius: 15
  },
  defaultSideMenu: {
    position: 'absolute',
    left: -HALF_SCREEN,
    width: HALF_SCREEN,
    height: '100%',
    paddingTop: StatusBar.currentHeight
  }
});
