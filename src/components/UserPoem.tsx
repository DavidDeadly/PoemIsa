import React, { FC } from 'react';
import Animated, { SharedValue } from 'react-native-reanimated';
import { StyleSheet, Text, TouchableOpacity, ViewToken } from 'react-native';

import { COLORS } from '@/constants';
import { Poem } from '@/types/models/poem';
import { useAnimateViewableItem } from '@/hooks/useAnimateViewableItem';
import { usePoemNavigate } from '@/hooks/usePoemNavigate';

type UserPoemProps = {
  poem: Poem;
  viewableItems: SharedValue<ViewToken[]>;
};

export const UserPoem: FC<UserPoemProps> = ({
  poem: { id, title },
  viewableItems
}) => {
  const { goToDetailed } = usePoemNavigate();
  const viewableStyle = useAnimateViewableItem({ viewableItems, itemId: id });

  return (
    <TouchableOpacity onPress={() => goToDetailed(id)}>
      <Animated.View style={[poem, viewableStyle]}>
        <Text style={text}>{title}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

const { poem, text } = StyleSheet.create({
  poem: {
    backgroundColor: `${COLORS.MAIN.PRIMARY}80`,
    borderRadius: 20,
    padding: 10,
    marginVertical: 10
  },
  text: {
    textAlign: 'center',
    color: '#222',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
