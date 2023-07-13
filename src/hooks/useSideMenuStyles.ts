import { HALF_SCREEN, THREESHOLD } from '@/constants/screens';
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
    onActive: (e, context) => (translationX.value = e.translationX + context.x),
    onEnd: () => {
      if (translationX.value <= THREESHOLD) {
        translationX.value = withTiming(0);
        return;
      }

      translationX.value = withTiming(HALF_SCREEN);
    }
  });

  const mainScreenAnimatedSyles = useAnimatedStyle(() => {
    const rotate = interpolate(
      translationX.value,
      [0, HALF_SCREEN],
      [0, 3],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        {
          perspective: 100
        },
        {
          translateX: translationX.value
        },
        {
          rotateY: `-${rotate}deg`
        }
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
    mainScreenAnimatedSyles,
    leftMenuAnimatedStyles
  };
};
