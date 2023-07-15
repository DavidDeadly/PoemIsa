import { StatusBar, StyleSheet, Text, TextInput } from 'react-native';

import { COLORS } from '@/constants';
import { MAX_TITLE_LENGHT } from '@/constants/poems';
import { PoemIsaGradient } from '../PoemIsaGradient';
import { InfiniteListPoems } from '@/components/ListPoems';

const HomeGradient = {
  start: { x: 2, y: 1 },
  end: { x: 0, y: 0 }
};

export const Home = () => {
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
        maxLength={MAX_TITLE_LENGHT}
        placeholder="Busca por título..."
        placeholderTextColor={COLORS.MAIN.SECONDARY}
        style={searchBar}
      />
      <InfiniteListPoems />
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
