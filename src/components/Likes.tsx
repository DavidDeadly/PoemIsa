import { COLORS } from '@/constants';
import { useLikePoem } from '@/hooks/useLikePoem';
import { Heart } from 'iconsax-react-native';
import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

type LikeIconProps = {
  likes?: string[];
  poemId?: string;
};

export const Likes: FC<LikeIconProps> = ({ likes, poemId }) => {
  const { isLiked, numLikes, toggleLike } = useLikePoem({
    likes,
    poemId
  });

  return (
    <TouchableOpacity style={likesContainer} onPress={toggleLike}>
      <Text style={likesText}>{numLikes}</Text>
      <Heart
        size="30"
        color={COLORS.MAIN.PRIMARY}
        variant={isLiked ? 'Bulk' : 'Broken'}
      />
    </TouchableOpacity>
  );
};

const { likesContainer, likesText } = StyleSheet.create({
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
  likesText: {
    color: COLORS.MAIN.SECONDARY
  }
});
