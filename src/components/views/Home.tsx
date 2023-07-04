import { FlatList, StatusBar, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';

import { COLORS } from '@/constants';
import { useIsFocused } from '@react-navigation/native';
import { getAllPoems } from '@/services/Poems';
import { useNotify } from '@/hooks';
import LinearGradient from 'react-native-linear-gradient';
import { Poem } from '../Poem';

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
        renderItem={({ item }) => <Poem poem={item} />}
        keyExtractor={item => item.id}
      />
    </LinearGradient>
  );
};

const { container, poemsContainer } = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  text: {
    textAlign: 'center',
    color: '#222'
  },
  poemsContainer: {
    marginHorizontal: 20,
    paddingVertical: 10,
    gap: 10
  }
});
