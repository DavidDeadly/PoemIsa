import { usePoemsFromInfiniteQuery } from '@/hooks/usePoemsFromInfiniteQuery';
import { useViewableItems } from '@/hooks/useViewableItems';
import { Loading } from './Loading';
import { RefreshControl, StyleSheet, Text, View } from 'react-native';
import { Poem } from './Poem';
import { InfinitQueryFooter } from './InfiniteQueryFooter';
import { COLORS } from '@/constants';
import { FlatList } from 'react-native-gesture-handler';

export const InfiniteListPoems = () => {
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isLoading,
    isError,
    poems,
    error,
    isRefreshing
  } = usePoemsFromInfiniteQuery();

  const handleNewPage = () => {
    const pausedInfinite = !hasNextPage || isFetchingNextPage;
    if (pausedInfinite) return;
    fetchNextPage();
  };
  const { viewableItems, onViewableItems } = useViewableItems();

  if (isLoading) {
    return <Loading style={contentCenter} />;
  }

  if (isError) {
    return (
      <View style={contentCenter}>
        <Text style={text}>
          {(error as Error).message ?? 'Ha ocurrido un error desconocido'}
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={poems}
      extraData={poems}
      keyExtractor={item => item.id}
      onEndReached={handleNewPage}
      contentContainerStyle={poemsContainer}
      onViewableItemsChanged={onViewableItems}
      ListEmptyComponent={<Text style={text}>No hay poemas</Text>}
      ListHeaderComponent={<Text style={title}>Poemas</Text>}
      renderItem={({ item: poem }) => (
        <Poem viewableItems={viewableItems} poem={poem} key={poem.id} />
      )}
      ListFooterComponent={
        <InfinitQueryFooter
          iconSize={50}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      }
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
  );
};

const { poemsContainer, text, title, contentCenter } = StyleSheet.create({
  poemsContainer: {
    marginHorizontal: 20,
    gap: 10
  },
  text: {
    textAlign: 'center',
    color: '#222'
  },
  title: {
    color: COLORS.MAIN.PRIMARY,
    fontSize: 40,
    fontFamily: 'MontserratAlternates-ExtraBoldItalic',
    marginBottom: 10
  },
  contentCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
