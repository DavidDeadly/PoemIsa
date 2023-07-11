import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text
} from 'react-native';

import { COLORS } from '@/constants';
import LinearGradient from 'react-native-linear-gradient';
import { Poem } from '@/components/Poem';
import { Loading } from '@/components/Loading';
import { usePoemsFromInfiniteQuery } from '@/hooks/usePoemsFromInfiniteQuery';

const AppGradient = {
  start: { x: 2, y: 1 },
  end: { x: 0, y: 0 }
};

export const Home = () => {
  const {
    isLoading,
    isError,
    poems,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    error,
    isRefreshing
  } = usePoemsFromInfiniteQuery();

  if (isError) {
    return (
      <LinearGradient
        accessibilityLabel="home"
        colors={Object.values(COLORS.MAIN)}
        style={[container, contentCenter]}
        start={AppGradient.start}
        end={AppGradient.end}>
        <Text style={text}>Error: {(error as Error).message}</Text>
      </LinearGradient>
    );
  }

  const handleNewPage = () => {
    const pausedInfinite = !hasNextPage || isFetchingNextPage;
    if (pausedInfinite) return;
    fetchNextPage();
  };

  return (
    <LinearGradient
      accessibilityLabel="home"
      colors={Object.values(COLORS.MAIN)}
      style={container}
      start={AppGradient.start}
      end={AppGradient.end}>
      {isError && <Text>Error consiguiendo los poemas.</Text>}
      {isLoading ? (
        <Loading style={contentCenter} />
      ) : (
        <FlatList
          onEndReached={handleNewPage}
          contentContainerStyle={poemsContainer}
          data={poems}
          extraData={poems}
          renderItem={({ item: poem }) => <Poem poem={poem} key={poem.id} />}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              enabled
              colors={Object.values(COLORS.MAIN)}
              progressBackgroundColor={COLORS.MAIN.SECONDARY}
              refreshing={isRefreshing}
              onRefresh={refetch}
            />
          }
        />
      )}
      {hasNextPage === false && (
        <Text style={text}>No hay más arte que mostrar.</Text>
      )}
      {isFetchingNextPage && <Text style={text}>Pidiendo más arte!!</Text>}
    </LinearGradient>
  );
};

const { container, poemsContainer, text, contentCenter } = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  contentCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
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
