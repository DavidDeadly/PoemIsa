import React from 'react';
import { Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Button } from '../components/Button';

export const Home = () => {
  const handleLogOut = () =>
    auth()
      .signOut()
      .then(() => GoogleSignin.signOut())
      .then(() => console.log('User signed out!'))
      .catch(error => console.log('error signing out:', error));

  return (
    <View>
      <Text style={{ color: '#222' }}>Home</Text>
      <Button text="Log out" onPress={handleLogOut} />
    </View>
  );
};
