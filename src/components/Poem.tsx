import { COLORS } from '@/constants';
import { Heart } from 'iconsax-react-native';
import { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type PoemProps = {
  poem: Poem;
};

export const Poem: FC<PoemProps> = ({
  poem: { title, author, likes, text }
}) => {
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
        <View style={likesContainer}>
          <Text style={likesText}>{likes}</Text>
          <Heart size="30" color={COLORS.MAIN.SECONDARY} />
        </View>
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
