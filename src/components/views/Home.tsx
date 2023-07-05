import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text
} from 'react-native';

import { COLORS } from '@/constants';
import { getAllPoems } from '@/services/Poems';
import LinearGradient from 'react-native-linear-gradient';
import { Poem } from '../Poem';
import { useInfiniteQuery } from 'react-query';
import React from 'react';
import { Loading } from '../Loading';

const AppGradient = {
  start: { x: 2, y: 1 },
  end: { x: 0, y: 0 }
};

export const Home = () => {
  const {
    isLoading,
    isError,
    data,
    fetchNextPage,
    hasNextPage,
    refetch,
    isFetchingNextPage,
    error,
    isRefetching
  } = useInfiniteQuery({
    queryKey: 'poems',
    queryFn: ({ pageParam }) => getAllPoems(pageParam),
    getNextPageParam: lastPage => lastPage.at(-1)?.id,
    retry: 3
  });

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

  return (
    <LinearGradient
      accessibilityLabel="home"
      colors={Object.values(COLORS.MAIN)}
      style={container}
      start={AppGradient.start}
      end={AppGradient.end}>
      {isError && <Text>Error consiguiendo los poemas.</Text>}
      {isLoading ? (
        <Loading styles={contentCenter} />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }
          onEndReached={() => fetchNextPage()}
          contentContainerStyle={poemsContainer}
          data={data?.pages.flat(1)}
          renderItem={({ item: poem }) => <Poem poem={poem} key={poem.id} />}
          keyExtractor={item => item.id}
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
