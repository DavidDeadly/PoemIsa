import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useViewableItems } from '@/hooks/useViewableItems';
import { useSearchedPoems } from '@/hooks/userSearchedPoems';

import { Loading } from './Loading';
import { Poem } from './Poem';
import { ListPoemsHeader } from './ListPoemsHeader';

type ListPoemsProps = {
  searchedTitle: string;
};

export const ListPoems = ({ searchedTitle }: ListPoemsProps) => {
  const { error, poems, refetch, isError, isRefetching, isLoading } =
    useSearchedPoems(searchedTitle);

  useEffect(() => {
    refetch();
  }, [searchedTitle, refetch]);

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
      contentContainerStyle={poemsContainer}
      onViewableItemsChanged={onViewableItems}
      ListEmptyComponent={
        <Text style={text}>
          {isRefetching ? 'Buscando poemas' : 'No hay poemas con ese título'}
        </Text>
      }
      ListHeaderComponent={<ListPoemsHeader refetch={refetch} />}
      renderItem={({ item: poem }) => (
        <Poem viewableItems={viewableItems} poem={poem} key={poem.id} />
      )}
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
