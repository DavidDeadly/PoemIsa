import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Likes } from './Likes';
import { Author } from '@/types/models/poem';
import { FC } from 'react';
import { COLORS, SCREENS } from '@/constants';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PoemIsaStackParamList } from '@/types/components';

type PoemInfo = {
  displayIf: boolean;
  poemId?: string;
  author?: Author;
  createdAt?: Date;
  usersLiked?: string[];
  likes?: number;
};

export const PoemInfo: FC<PoemInfo> = ({
  displayIf,
  author,
  poemId,
  createdAt,
  usersLiked,
  likes
}) => {
  const navigation =
    useNavigation<StackNavigationProp<PoemIsaStackParamList>>();

  if (!displayIf) return null;

  const goToEditor = () =>
    navigation.navigate(SCREENS.APP.WRITE, {
      poemId: poemId ?? ''
    });

  return (
    <View style={info}>
      <View style={authorInfo}>
        <Image
          defaultSource={require('@/assets/images/default-profile-photo.png')}
          source={{ uri: author?.photoURL ?? undefined }}
          style={image}
        />
        <View>
          <Text style={authorText}>{author?.displayName ?? 'Anonymous'}</Text>
          <Text style={date}>{createdAt?.toLocaleDateString('es')}</Text>
        </View>
      </View>
      <Button title="Editar" color={COLORS.MAIN.PRIMARY} onPress={goToEditor} />
      <Likes likes={likes} usersLiked={usersLiked} poemId={poemId} />
    </View>
  );
};

const { info, date, authorInfo, authorText, image } = StyleSheet.create({
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  date: {
    color: COLORS.MAIN.PRIMARY
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
  }
});
