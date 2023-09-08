import { WebView } from 'react-native-webview';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import { Loading } from '@/components/Loading';
import { PoemInfo } from '@/components/PoemInfo';
import { COLORS } from '@/constants';
import { useDetailedPoem } from '@/hooks/useDetailedPoem';
import { PoemIsaGradient } from '@/components/PoemIsaGradient';

const PoemDetailedGradient = {
  start: { x: 2, y: 1 },
  end: { x: 0, y: 0 }
};

export const PoemDetailed = () => {
  const { poem, isLoading, isError, error } = useDetailedPoem();

  if (isError) {
    return (
      <PoemIsaGradient
        label="poemDetailed"
        style={[container, contentCenter]}
        gradient={PoemDetailedGradient}>
        <Text style={title}>Error: {(error as Error).message}</Text>
      </PoemIsaGradient>
    );
  }

  return (
    <PoemIsaGradient
      label="poemDetailed"
      style={container}
      gradient={PoemDetailedGradient}>
      {isLoading ? (
        <Loading style={contentCenter} />
      ) : (
        <View style={poemContainer}>
          <Text style={[title, border]}>{poem?.title}</Text>
          <WebView
            style={webView}
            containerStyle={[webViewContainer, border]}
            minimumFontSize={50}
            originWhitelist={['*']}
            source={{ html: poem?.html ?? '' }}
            androidLayerType="software"
          />
          <PoemInfo
            displayIf={Boolean(poem)}
            poemId={poem?.id}
            likes={poem?.likes}
            author={poem?.author}
            usersLiked={poem?.usersLiked}
            createdAt={poem?.createdAt}
          />
        </View>
      )}
    </PoemIsaGradient>
  );
};

const {
  container,
  contentCenter,
  webView,
  webViewContainer,
  poemContainer,
  title,
  border
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
    borderTopWidth: 0,
    backgroundColor: `${COLORS.MAIN.PRIMARY}40`
  },
  webView: {
    backgroundColor: 'transparent'
  },
  border: {
    borderColor: `${COLORS.MAIN.PRIMARY}80`,
    borderWidth: 1.5,
    borderRadius: 10
  },
  poemContainer: {
    width: '90%',
    minHeight: '92%',
    marginVertical: 10
  },
  title: {
    color: '#222',
    fontSize: 25,
    padding: 10,
    borderBottomWidth: 0,
    textAlign: 'center',
    fontFamily: 'MontserratAlternates-ExtraBoldItalic',
    backgroundColor: `${COLORS.MAIN.PRIMARY}40`
  }
});
