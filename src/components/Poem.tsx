import { FC } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken
} from 'react-native';

import { COLORS } from '@/constants';
import { PoemIsaStackParamList } from '@/types/components';
import { Poem as PoemType } from '@/types/models/poem';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Likes } from '@/components/Likes';
import Animated, { SharedValue } from 'react-native-reanimated';
import { useAnimateViewableItem } from '@/hooks/useAnimateViewableItem';

type PoemProps = {
  poem: PoemType;
  viewableItems: SharedValue<ViewToken[]>;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
export const Poem: FC<PoemProps> = ({
  poem: { id, title, author, likes, text, createdAt },
  viewableItems
}) => {
  const navigation = useNavigation<NavigationProp<PoemIsaStackParamList>>();
  const viewableStyle = useAnimateViewableItem({
    viewableItems,
    itemId: id
  });

  const goToDetailedPoem = () => {
    navigation.navigate('Detalle Poem', {
      poemId: id
    });
  };

  return (
    <AnimatedTouchable style={[poem, viewableStyle]} onPress={goToDetailedPoem}>
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
          <View>
            <Text style={authorText}>{author.displayName ?? 'Anonymous'}</Text>
            <Text style={date}>{createdAt.toLocaleDateString('es')}</Text>
          </View>
        </View>
        <Likes likes={likes} poemId={id} />
      </View>
    </AnimatedTouchable>
  );
};

const {
  authorText,
  poem,
  titleStyle,
  textStyle,
  image,
  info,
  authorInfo,
  date
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
