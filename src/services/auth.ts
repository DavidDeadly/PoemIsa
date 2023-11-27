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
      .then(() => console.info('User signed out!'))
      .catch((error: Error) =>
        console.error('error signing out:', error.message)
      );
  }

  async loginWithGoogle() {
    const result = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true
    })
      .then(() => GoogleSignin.signIn())
      .then(({ idToken }) => {
        if (!idToken) {
          throw new UnexpectedException(
            'No idToken, ensure you have configured Google Sign In correctly'
          );
        }

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        return auth().signInWithCredential(googleCredential);
      })
      .catch((error: Error) => {
        console.error(`Error login with google: ${error}`);

        const possibleErrors = Object.values(ERRORS.SING_IN);

        if (!possibleErrors.includes(error.message)) {
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
