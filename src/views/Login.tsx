import { View, Text } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { useContext } from 'react';
import { UserContext } from '../App';

export const Login = () => {
  const user = useContext(UserContext);
  const loginWithGoogle = async () => {
    const result = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true
    })
      .then(() => {
        console.log('has play services');
        return GoogleSignin.signIn();
      })
      .then(({ idToken }) => {
        console.log(idToken);
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        console.log(googleCredential);
        return auth().signInWithCredential(googleCredential);
      })
      .catch(error =>
        console.log('error signing in with google', error.message)
      );

    return result;
  };

  return (
    <View>
      <Text>Please login</Text>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={loginWithGoogle}
        disabled={Boolean(user)}
      />
    </View>
  );
};
