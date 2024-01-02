import { StatusBar, StyleSheet, Text, TextInput } from 'react-native';

import { COLORS } from '@/constants';
import { MAX_TITLE_LENGTH } from '@/constants/poems';
import { PoemIsaGradient } from '@/components/PoemIsaGradient';
import { InfiniteListPoems } from '@/components/ListPoems';
import debounce from 'just-debounce-it';
import { useState } from 'react';

const HomeGradient = {
  start: { x: 2, y: 1 },
  end: { x: 0, y: 0 }
};

export const Home = () => {
  const [searchedTitle, setSearchTitle] = useState('');
  const searchPoem = debounce((text: string) => setSearchTitle(text), 500);

  return (
    <PoemIsaGradient
      label="home"
      style={container}
      gradient={HomeGradient}
      LeftMenuComponent={
        <Text style={sideText}>Oye... sabes que TE AMOOO!!! No??</Text>
      }
      LeftMenuComponentStyle={sideMenu}>
      <TextInput
        numberOfLines={1}
        maxLength={MAX_TITLE_LENGTH}
        placeholder="Busca por título..."
        placeholderTextColor={COLORS.MAIN.SECONDARY}
        style={searchBar}
        onChangeText={searchPoem}
      />
      <InfiniteListPoems searchedTitle={searchedTitle} />
    </PoemIsaGradient>
  );
};

const { container, searchBar, sideText, sideMenu } = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
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
  },
  sideMenu: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  sideText: {
    textAlign: 'center',
    color: COLORS.MAIN.PRIMARY,
    fontWeight: 'bold',
    fontSize: 35,
    fontStyle: 'italic'
  }
});
