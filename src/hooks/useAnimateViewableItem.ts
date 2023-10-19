import { ViewToken } from 'react-native';
import {
  SharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';

export const useAnimateViewableItem = ({
  viewableItems,
  itemId
}: {
  viewableItems: SharedValue<ViewToken[]>;
  itemId: string;
}) => {
  const reanimatedStyle = useAnimatedStyle(() => {
    const isPoemVisible = viewableItems.value.some(
      viewable => viewable.isViewable && viewable.item.id === itemId
    );

    return {
      opacity: withTiming(isPoemVisible ? 1 : 0),
      transform: [
        {
          scale: withTiming(isPoemVisible ? 1 : 0.8)
        }
      ]
    };
  });

  return reanimatedStyle;
};
