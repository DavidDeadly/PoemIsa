import {
  FlatList,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TextInput
} from 'react-native';

import { COLORS } from '@/constants';
import LinearGradient from 'react-native-linear-gradient';
import { Poem } from '@/components/Poem';
import { Loading } from '@/components/Loading';
import { usePoemsFromInfiniteQuery } from '@/hooks/usePoemsFromInfiniteQuery';
import { MAX_TITLE_LENGHT } from '@/constants/poems';
import { InfinitQueryFooter } from '@/components/InfiniteQueryFooter';

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
          ListHeaderComponent={<Text style={title}>Poems</Text>}
          onEndReached={handleNewPage}
          contentContainerStyle={poemsContainer}
          data={poems}
          extraData={poems}
          renderItem={({ item: poem }) => <Poem poem={poem} key={poem.id} />}
          keyExtractor={item => item.id}
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
    </LinearGradient>
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
