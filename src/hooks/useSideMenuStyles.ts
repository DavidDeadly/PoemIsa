import { HALF_SCREEN, THRESHOLD } from '@/constants/screens';
import { PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import {
  Extrapolate,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';

export const useSideMenuStyles = () => {
  const translationX = useSharedValue(0);
  const panGestureHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    { x: number }
  >({
    onStart: (_, context) => (context.x = translationX.value),
    onActive: (e, context) =>
      (translationX.value = Math.max(e.translationX + context.x)),
    onEnd: () => {
      if (translationX.value <= THRESHOLD) {
        translationX.value = withTiming(0);
        return;
      }

      translationX.value = withTiming(HALF_SCREEN);
    }
  });

  const mainScreenAnimatedStyles = useAnimatedStyle(() => {
    const rotate = interpolate(
      translationX.value,
      [0, HALF_SCREEN],
      [0, 3],
      Extrapolate.CLAMP
    );

    const borderRadius = interpolate(
      translationX.value,
      [0, HALF_SCREEN],
      [0, 15],
      Extrapolate.CLAMP
    );
    return {
      borderRadius,
      transform: [
        { perspective: 100 },
        { translateX: translationX.value },
        { rotateY: `-${rotate}deg` }
      ]
    };
  }, []);

  const leftMenuAnimatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateX: translationX.value
        }
      ]
    }),
    []
  );

  return {
    panGestureHandler,
    mainScreenAnimatedStyles,
    leftMenuAnimatedStyles
  };
};
