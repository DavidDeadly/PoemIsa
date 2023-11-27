import { usePoemsFromInfiniteQuery } from '@/hooks/usePoemsFromInfiniteQuery';
import { useViewableItems } from '@/hooks/useViewableItems';
import { Loading } from './Loading';
import { StyleSheet, Text, View } from 'react-native';
import { Poem } from './Poem';
import { InfiniteQueryFooter } from './InfiniteQueryFooter';
import { FlatList } from 'react-native-gesture-handler';
import { ListPoemsHeader } from './ListPoemsHeader';

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
      ListEmptyComponent={
        <Text style={text}>
          {isRefreshing ? 'Refrescando poemas' : 'No hay poemas'}
        </Text>
      }
      ListHeaderComponent={<ListPoemsHeader refetch={refetch} />}
      renderItem={({ item: poem }) => (
        <Poem viewableItems={viewableItems} poem={poem} key={poem.id} />
      )}
      ListFooterComponent={
        <InfiniteQueryFooter
          iconSize={50}
          hasNextPage={hasNextPage}
          isFetchingNextPage={isFetchingNextPage}
        />
      }
    />
  );
};

const { poemsContainer, text, contentCenter } = StyleSheet.create({
  poemsContainer: {
    marginHorizontal: 20,
    gap: 10
  },
  text: {
    textAlign: 'center',
    color: '#222'
  },
  contentCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
