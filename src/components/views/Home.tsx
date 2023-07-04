import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';

import { COLORS } from '@/constants';
import { useIsFocused } from '@react-navigation/native';
import { getAllPoems } from '@/services/Poems';
import { useNotify } from '@/hooks';
import LinearGradient from 'react-native-linear-gradient';

const AppGradient = {
  start: { x: 2, y: 1 },
  end: { x: 0, y: 0 }
};

export const Home = () => {
  const [poems, setPoems] = useState<Poem[]>([]);
  const isFocused = useIsFocused();
  const notify = useNotify();

  useEffect(() => {
    if (isFocused) {
      getAllPoems()
        .then(setPoems)
        .catch(() => notify.error('Error obteniendo todos los poemas'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused]);

  return (
    <LinearGradient
      accessibilityLabel="home"
      colors={Object.values(COLORS.MAIN)}
      style={container}
      start={AppGradient.start}
      end={AppGradient.end}>
      <FlatList
        contentContainerStyle={poemsContainer}
        data={poems}
        renderItem={({
          item: {
            title,
            author: { displayName: authorName }
          }
        }) => {
          return (
            <View style={poem}>
              <Text style={text}>Title: {title}</Text>
              <Text style={[text, authorText]}>
                By: {authorName ?? 'Anonymous'}
              </Text>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </LinearGradient>
  );
};

const { container, authorText, poem, poemsContainer, text } = StyleSheet.create(
  {
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight
    },
    text: {
      textAlign: 'center',
      color: '#222'
    },
    authorText: {
      fontStyle: 'italic',
      fontWeight: '500'
    },
    poemsContainer: {
      margin: 20,
      gap: 10
    },
    poem: {
      backgroundColor: `${COLORS.MAIN.PRIMARY}80`,
      borderRadius: 20,
      padding: 10
    }
  }
);
