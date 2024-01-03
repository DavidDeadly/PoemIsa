import React, { useRef, useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import debounce from 'just-debounce-it';
import { CloseSquare } from 'iconsax-react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { PoemIsaStackParamList } from './types/components';
import { COLORS } from '@/constants';
import { MAX_TITLE_LENGTH } from '@/constants/poems';
import { PoemIsaGradient } from '@/components/PoemIsaGradient';
import { InfiniteListPoems } from '@/components/InfiniteListPoems';
import { ListPoems } from '../ListPoems';
import { notificationsEventHandler, onMessage } from '@/helpers/notifications';

const HomeGradient = {
  start: { x: 2, y: 1 },
  end: { x: 0, y: 0 }
};

export const Home = () => {
  const [searchedTitle, setSearchTitle] = useState('');
  const navigation = useNavigation<NavigationProp<PoemIsaStackParamList>>();
  const inputRef = useRef<TextInput>(null);

  const searchPoem = debounce((text: string) => setSearchTitle(text), 500);

  const clearSearch = () => {
    inputRef.current?.clear();
    searchPoem('');
  };

  useEffect(() => {
    const unsubscribe = messaging().onMessage(onMessage);

    messaging()
      .subscribeToTopic('Poems')
      .then(() => console.info('Subscribed to poems topic!'));

    const unsubscribeNotifeeFore = notifee.onForegroundEvent(
      ({ type, detail }) =>
        notificationsEventHandler({
          type,
          detail,
          navigate: navigation.navigate
        })
    );

    return () => {
      messaging().unsubscribeFromTopic('Poems');
      unsubscribeNotifeeFore();
      unsubscribe();
    };
  }, [navigation]);

  return (
    <PoemIsaGradient
      label="home"
      style={container}
      gradient={HomeGradient}
      LeftMenuComponent={
        <Text style={sideText}>Oye... sabes que TE AMOOO!!! No??</Text>
      }
      LeftMenuComponentStyle={sideMenu}>
      <View style={searchContainer}>
        <TextInput
          ref={inputRef}
          numberOfLines={1}
          maxLength={MAX_TITLE_LENGTH}
          placeholder="Busca por título..."
          placeholderTextColor={COLORS.MAIN.SECONDARY}
          style={searchBar}
          onChangeText={searchPoem}
        />
        <TouchableHighlight onPress={clearSearch}>
          <CloseSquare size="32" color={COLORS.MAIN.PRIMARY} variant="Bulk" />
        </TouchableHighlight>
      </View>

      {searchedTitle ? (
        <ListPoems searchedTitle={searchedTitle} />
      ) : (
        <InfiniteListPoems />
      )}
    </PoemIsaGradient>
  );
};

const { container, searchBar, searchContainer, sideText, sideMenu } =
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight
    },
    searchBar: {
      color: COLORS.MAIN.PRIMARY,
      fontSize: 20,
      padding: 10,
      fontStyle: 'italic',
      fontWeight: '500'
    },
    searchContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: `${COLORS.MAIN.PRIMARY}80`,
      borderRadius: 20,
      marginVertical: 10,
      marginHorizontal: 20,
      padding: 5
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
