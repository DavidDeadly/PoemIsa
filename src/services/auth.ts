import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { APIS } from '@/constants';
import { ERRORS } from '@/constants';
import { SignInException } from '@/errors';
import { UnexpectedException } from '@/errors';

class Auth implements IAuth {
  constructor() {
    GoogleSignin.configure({ webClientId: APIS.WEB_CLIENT_ID });
  }

  signOut() {
    auth()
      .signOut()
      .then(() => GoogleSignin.signOut())
      .then(() => console.log('User signed out!'))
      .catch((error: Error) =>
        console.log('error signing out:', error.message)
      );
  }

  async loginWithGoogle() {
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
      .catch((error: Error) => {
        const posibleErrors = Object.values(ERRORS.SING_IN);

        if (!posibleErrors.includes(error.message)) {
          throw new UnexpectedException(error.message);
        }

        throw new SignInException(error.message);
      });

    return result;
  }

  onStateChanged(callback: (user: any) => void) {
    return auth().onAuthStateChanged(callback);
  }
}

export default new Auth();
