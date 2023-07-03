import { FlatList, StatusBar, StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { Button } from '@/components';
import { COLORS } from '@/constants';
import { useIsFocused } from '@react-navigation/native';
import { getAllPoems } from '@/services/Poems';

export const Home = () => {
  const [poems, setPoems] = useState<AllPoemsData[]>([]);
  const isFocused = useIsFocused();

  const handleSignOut = () =>
    auth()
      .signOut()
      .then(() => GoogleSignin.signOut())
      .then(() => console.log('User signed out!'))
      .catch(error => console.log('error signing out:', error));

  useEffect(() => {
    if (isFocused) {
      getAllPoems()
        .then(poemsData => setPoems(poemsData))
        .catch(err => console.log('error getting all poems: ', err.message));
    }
  }, [isFocused]);

  return (
    <View style={container}>
      <Text style={text}>Inicio</Text>
      <Button onPress={handleSignOut}>
        <Text>Cerrar sesión</Text>
      </Button>
      <FlatList
        contentContainerStyle={poemsContainer}
        data={poems}
        renderItem={({
          item: {
            title,
            author: { displayName: authorName }
          }
        }) => {
          return (
            <View style={poem}>
              <Text style={text}>Title: {title}</Text>
              <Text style={[text, authorText]}>
                By: {authorName ?? 'Anonymous'}
              </Text>
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const { container, authorText, poem, poemsContainer, text } = StyleSheet.create(
  {
    container: {
      paddingTop: StatusBar.currentHeight
    },
    text: {
      textAlign: 'center',
      color: '#222'
    },
    authorText: {
      fontStyle: 'italic',
      fontWeight: '500'
    },
    poemsContainer: {
      margin: 20,
      gap: 10
    },
    poem: {
      backgroundColor: `${COLORS.MAIN.PRIMARY}80`,
      borderRadius: 20,
      padding: 10
    }
  }
);
