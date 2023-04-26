import { useContext } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

import { UserContext } from '@/context/UserContext';

export const useUser = () => {
  const user = useContext(UserContext);

  const signOut = () => {
    auth()
      .signOut()
      .then(() => GoogleSignin.signOut())
      .then(() => console.log('User signed out!'))
      .catch((error: Error) =>
        console.log('error signing out:', error.message)
      );
  };

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

  return { user, signOut, loginWithGoogle };
};
