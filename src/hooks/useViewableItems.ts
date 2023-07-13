import { useCallback } from 'react';
import { ViewToken } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';

export const useViewableItems = () => {
  const viewableItems = useSharedValue<ViewToken[]>([]);

  const onViewableItems = useCallback(
    ({ viewableItems: vItems }: { viewableItems: ViewToken[] }) => {
      viewableItems.value = vItems;
    },
    [viewableItems]
  );

  return {
    viewableItems,
    onViewableItems
  };
};
