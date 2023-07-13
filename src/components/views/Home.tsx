import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  ViewToken
} from 'react-native';

import { COLORS } from '@/constants';
import { Poem } from '@/components/Poem';
import { Loading } from '@/components/Loading';
import { usePoemsFromInfiniteQuery } from '@/hooks/usePoemsFromInfiniteQuery';
import { MAX_TITLE_LENGHT } from '@/constants/poems';
import { InfinitQueryFooter } from '@/components/InfiniteQueryFooter';
import { useSharedValue } from 'react-native-reanimated';
import { useCallback } from 'react';
import { PoemIsaGradient } from '../PoemIsaGradient';

const HomeGradient = {
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

  const viewableItems = useSharedValue<ViewToken[]>([]);

  const onViewableItems = useCallback(
    ({ viewableItems: vItems }: { viewableItems: ViewToken[] }) => {
      viewableItems.value = vItems;
    },
    [viewableItems]
  );

  if (isError) {
    return (
      <PoemIsaGradient
        label="home"
        style={[container, contentCenter]}
        gradient={HomeGradient}>
        <Text style={text}>Error: {(error as Error).message}</Text>
      </PoemIsaGradient>
    );
  }

  const handleNewPage = () => {
    const pausedInfinite = !hasNextPage || isFetchingNextPage;
    if (pausedInfinite) return;
    fetchNextPage();
  };

  return (
    <PoemIsaGradient label="home" style={container} gradient={HomeGradient}>
      <TextInput
        numberOfLines={1}
        maxLength={MAX_TITLE_LENGHT}
        placeholder="Busca por título..."
        placeholderTextColor={COLORS.MAIN.SECONDARY}
        style={searchBar}
      />
      {isError && <Text>Error consiguiendo los poemas.</Text>}
      {isLoading ? (
        <Loading style={contentCenter} />
      ) : (
        <FlatList
          data={poems}
          extraData={poems}
          keyExtractor={item => item.id}
          onEndReached={handleNewPage}
          contentContainerStyle={poemsContainer}
          onViewableItemsChanged={onViewableItems}
          ListHeaderComponent={<Text style={title}>Poems</Text>}
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
      )}
    </PoemIsaGradient>
  );
};

const { container, poemsContainer, text, title, contentCenter, searchBar } =
  StyleSheet.create({
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
    title: {
      color: COLORS.MAIN.PRIMARY,
      fontSize: 40,
      fontFamily: 'MontserratAlternates-ExtraBoldItalic',
      marginBottom: 10
    },
    poemsContainer: {
      marginHorizontal: 20,
      gap: 10
    },
    searchBar: {
      backgroundColor: `${COLORS.MAIN.PRIMARY}80`,
      color: COLORS.MAIN.PRIMARY,
      fontSize: 20,
      marginHorizontal: 20,
      padding: 15,
      borderRadius: 20,
      marginVertical: 10,
      fontStyle: 'italic',
      fontWeight: '500'
    }
  });
