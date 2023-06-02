import {
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  StatusBar
} from 'react-native';
import { Google } from 'iconsax-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FlipInXDown } from 'react-native-reanimated';
import { useToast } from 'react-native-toast-notifications';

import { Button } from '@/components';
import { COLORS } from '@/constants';
import { Quote } from '@/components';
import { FadeInView } from '@/components';
import { Loading } from '@/components';
import { useUser } from '@/hooks';
import { useFlipQuoteEffects } from '@/hooks';
import { SignInException } from '@/errors';
import { ERRORS, ERRORS_MAP_TO_USER } from '@/constants';

const AppGradient = {
  start: { x: 1, y: 1 },
  end: { x: 0, y: 0 }
};

export const Login = () => {
  const { user, loginWithGoogle } = useUser();
  const { randomQuote, flipPoetry, animatedStyle } = useFlipQuoteEffects({
    delayEffect: 500
  });
  const toast = useToast();

  const handleLogin = () => {
    loginWithGoogle()
      .then(() => {
        toast.show('Inicio de sesión exitoso', { type: 'success' });
      })
      .catch(error => {
        const userFriendlyMessage: string =
          error instanceof SignInException
            ? ERRORS_MAP_TO_USER.get(error.message)!
            : ERRORS_MAP_TO_USER.get(ERRORS.UNEXPECTED)!;

        toast.show(userFriendlyMessage, { type: 'danger' });
      });
  };

  return (
    <LinearGradient
      accessibilityLabel="login"
      colors={Object.values(COLORS.MAIN)}
      style={styles.container}
      start={AppGradient.start}
      end={AppGradient.end}>
      <Text style={styles.title}>PoemIsa</Text>

      <Button
        style={styles.button}
        onPress={() => handleLogin()}
        disabled={Boolean(user)}>
        <Google size="25" color={COLORS.MAIN.SECONDARY} />
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </Button>

      <TouchableWithoutFeedback onPress={() => randomQuote && flipPoetry()}>
        <Animated.Image
          entering={FlipInXDown.duration(1000)}
          accessibilityRole="imagebutton"
          source={require('@/assets/images/login-picture.png')}
          style={[styles.image, animatedStyle]}
        />
      </TouchableWithoutFeedback>

      {!randomQuote ? (
        <Loading styles={styles.quoteContainer} />
      ) : (
        <FadeInView
          accessibilityLabel="quote"
          styles={styles.quoteContainer}
          duration={1000}>
          <Quote quote={randomQuote} fontSize={20} />
        </FadeInView>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    textAlign: 'center',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight
  },
  title: {
    fontSize: 60,
    marginTop: 60,
    fontFamily: 'MontserratAlternates-ExtraBoldItalic',
    flex: 1,
    fontWeight: '600',
    color: COLORS.MAIN.PRIMARY
  },
  quoteContainer: {
    flex: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginBottom: 50
  },
  button: {
    flex: 1
  },
  buttonText: {
    color: '#fff'
  },
  image: {
    flex: 2,
    margin: 0,
    width: '80%',
    resizeMode: 'cover',
    borderRadius: 50,
    borderColor: COLORS.MAIN.PRIMARY,
    borderWidth: 2,
    padding: 10,
    backgroundColor: COLORS.MAIN.SECONDARY,
    opacity: 0.5
  }
});
