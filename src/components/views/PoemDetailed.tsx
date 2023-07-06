import { getPoemById } from '@/services/Poems';
import { PoemIsaStackParamList } from '@/types/components';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useQuery } from 'react-query';
import { Loading } from '../Loading';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS } from '@/constants';
import { WebView } from 'react-native-webview';
import { Likes } from '@/components/Likes';
import { Author } from '@/types/models/poem';
import { FC } from 'react';

const AppGradient = {
  start: { x: 2, y: 1 },
  end: { x: 0, y: 0 }
};

type PoemInfo = {
  displayIf: boolean;
  poemId?: string;
  author?: Author;
  createdAt?: Date;
  likes?: string[];
};

const PoemInfo: FC<PoemInfo> = ({
  displayIf,
  author,
  poemId,
  createdAt,
  likes
}) => {
  if (!displayIf) return null;

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
      <Likes likes={likes} poemId={poemId} />
    </View>
  );
};

export const PoemDetailed = () => {
  const { params } = useRoute<RouteProp<PoemIsaStackParamList>>();
  const { isLoading, isError, data, error } = useQuery({
    queryKey: `poem-${params?.poemId}`,
    queryFn: () => getPoemById(params?.poemId)
  });

  if (isError) {
    return (
      <LinearGradient
        accessibilityLabel="home"
        colors={Object.values(COLORS.MAIN)}
        style={[container, contentCenter]}
        start={AppGradient.start}
        end={AppGradient.end}>
        <Text style={title}>Error: {(error as Error).message}</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      accessibilityLabel="home"
      colors={Object.values(COLORS.MAIN)}
      style={container}
      start={AppGradient.start}
      end={AppGradient.end}>
      {isLoading ? (
        <Loading style={contentCenter} />
      ) : (
        <View style={poemContainer}>
          <Text style={[title, border]}>{data?.title}</Text>
          <WebView
            style={{
              backgroundColor: 'transparent'
            }}
            containerStyle={[webViewContainer, border]}
            minimumFontSize={50}
            originWhitelist={['*']}
            source={{ html: data?.html ?? '' }}
            androidLayerType="software"
          />
          <PoemInfo
            displayIf={Boolean(data)}
            poemId={data?.id}
            likes={data?.likes}
            author={data?.author}
            createdAt={data?.createdAt}
          />
        </View>
      )}
    </LinearGradient>
  );
};

const {
  container,
  contentCenter,
  webViewContainer,
  poemContainer,
  title,
  border,
  info,
  date,
  authorInfo,
  authorText,
  image
} = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight
  },
  contentCenter: {
    flex: 1,
    justifyContent: 'center'
  },
  webViewContainer: {
    flex: 1,
    padding: 10,
    borderTopWidth: 0
  },
  border: {
    borderColor: `${COLORS.MAIN.PRIMARY}80`,
    borderWidth: 1.5,
    borderRadius: 10
  },
  poemContainer: {
    width: '90%',
    minHeight: '80%',
    marginVertical: 10
  },
  title: {
    color: '#222',
    fontSize: 25,
    padding: 10,
    borderBottomWidth: 0,
    textAlign: 'center',
    fontFamily: 'MontserratAlternates-ExtraBoldItalic'
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
