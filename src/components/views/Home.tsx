import { StatusBar, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { Button } from '@/components';

export const Home = () => {
  const handleSignOut = () =>
    auth()
      .signOut()
      .then(() => GoogleSignin.signOut())
      .then(() => console.log('User signed out!'))
      .catch(error => console.log('error signing out:', error));

  return (
    <View style={{ paddingTop: StatusBar.currentHeight }}>
      <Text style={{ color: '#222' }}>Inicio</Text>
      <Button onPress={handleSignOut}>
        <Text>Cerrar sesión</Text>
      </Button>
    </View>
  );
};
