import { COLORS } from '@/constants';
import { useUser } from '@/hooks';
import { likePoem, unlikePoem } from '@/services/Poems';
import { Heart } from 'iconsax-react-native';
import { FC, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type PoemProps = {
  poem: Poem;
};

const useLikes = ({ likes, userId }: { likes: string[]; userId?: string }) => {
  const [isLiked, setIsLiked] = useState<boolean>();
  const [numLikes, setNumLikes] = useState<number>(0);

  const unlike = () => {
    setIsLiked(false);
    setNumLikes(num => num - 1);
  };

  const like = () => {
    setIsLiked(true);
    setNumLikes(num => num + 1);
  };

  useEffect(() => {
    if (!userId) return;

    const alreadyLiked = likes.includes(userId);

    setIsLiked(alreadyLiked);
    setNumLikes(likes.length);
  }, [likes, userId]);

  return {
    isLiked,
    numLikes,
    like,
    unlike
  };
};

export const Poem: FC<PoemProps> = ({
  poem: { id, title, author, likes, text }
}) => {
  const { user } = useUser();
  const { isLiked, numLikes, like, unlike } = useLikes({
    likes,
    userId: user?.uid
  });

  const toggleLike = async () => {
    if (!user?.uid) return;
    if (isLiked) {
      await unlikePoem(id, user.uid);
      unlike();
      return;
    }

    await likePoem(id, user.uid);
    like();
  };

  return (
    <View style={poem}>
      <Text style={titleStyle}>{title}</Text>
      <Text style={textStyle} numberOfLines={4}>
        {text}
      </Text>
      <View style={info}>
        <View style={authorInfo}>
          <Image
            defaultSource={require('@/assets/images/default-profile-photo.png')}
            source={{ uri: author.photoURL ?? undefined }}
            style={image}
          />
          <Text style={authorText}>{author.displayName ?? 'Anonymous'}</Text>
        </View>
        <TouchableOpacity style={likesContainer} onPress={toggleLike}>
          <Text style={likesText}>{numLikes}</Text>
          {isLiked ? (
            <Heart size="30" color={COLORS.MAIN.PRIMARY} variant="Bulk" />
          ) : (
            <Heart size="30" color={COLORS.MAIN.PRIMARY} variant="Broken" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const {
  authorText,
  poem,
  titleStyle,
  textStyle,
  image,
  info,
  likesContainer,
  likesText,
  authorInfo
} = StyleSheet.create({
  titleStyle: {
    textAlign: 'center',
    color: '#222',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 2
  },
  textStyle: {
    color: '#222',
    fontSize: 14
  },
  poem: {
    backgroundColor: `${COLORS.MAIN.PRIMARY}80`,
    borderRadius: 20,
    padding: 10,
    gap: 10
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5
  },
  authorText: {
    fontStyle: 'italic',
    fontWeight: '500',
    color: '#222'
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: COLORS.MAIN.SECONDARY
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2
  },
  likesText: {
    color: COLORS.MAIN.SECONDARY
  }
});
