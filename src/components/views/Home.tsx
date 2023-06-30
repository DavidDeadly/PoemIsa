import { StatusBar, Text, View } from 'react-native';
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import functions from '@react-native-firebase/functions';

import { Button } from '@/components';

export const poemsCollectionGroup = firestore().collectionGroup('Poems');

export const Home = () => {
  const handleSignOut = () =>
    auth()
      .signOut()
      .then(() => GoogleSignin.signOut())
      .then(() => console.log('User signed out!'))
      .catch(error => console.log('error signing out:', error));

  useEffect(() => {
    const allPoems = async () => {
      const getAllPoems = functions().httpsCallable('getAllPoems');

      const res = await getAllPoems().catch(err =>
        console.log('error getting all poems: ', err)
      );
      console.log('poems: ', res);
    };

    allPoems();
  }, []);

  return (
    <View style={{ paddingTop: StatusBar.currentHeight }}>
      <Text style={{ color: '#222' }}>Inicio</Text>
      <Button onPress={handleSignOut}>
        <Text>Cerrar sesión</Text>
      </Button>
    </View>
  );
};
