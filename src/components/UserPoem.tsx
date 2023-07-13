import { COLORS } from '@/constants';
import { useAnimateViewableItem } from '@/hooks/useAnimateViewableItem';
import { Poem } from '@/types/models/poem';
import { FC } from 'react';
import { StyleSheet, Text, ViewToken } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';

type UserPoemProps = {
  poem: Poem;
  viewableItems: SharedValue<ViewToken[]>;
};

export const UserPoem: FC<UserPoemProps> = ({
  poem: {
    id,
    title,
    author: { displayName: authorName }
  },
  viewableItems
}) => {
  const viewableStyle = useAnimateViewableItem({ viewableItems, itemId: id });
  return (
    <Animated.View style={[poem, viewableStyle]}>
      <Text style={text}>Title: {title}</Text>
      <Text style={[text, authorText]}>By: {authorName ?? 'Anonymous'}</Text>
    </Animated.View>
  );
};

const { poem, text, authorText } = StyleSheet.create({
  poem: {
    backgroundColor: `${COLORS.MAIN.PRIMARY}80`,
    borderRadius: 20,
    padding: 10,
    marginVertical: 10
  },
  text: {
    textAlign: 'center',
    color: '#222'
  },
  authorText: {
    fontStyle: 'italic',
    fontWeight: '500'
  }
});
