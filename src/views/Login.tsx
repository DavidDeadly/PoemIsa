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

import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/Button';
import { COLORS } from '@/constants';
import { Quote } from '@/components/Quote';
import { FadeInView } from '@/components/FadeInView';
import { Loading } from '@/components/Loading';
import { useFlipQuoteEffects } from '@/hooks/useFlipQuoteEffects';
import { SigInException } from '@/errors/SignInException';
import { ERRORS, ERRORS_MAP_TO_USER } from '@/constants/errors';

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
          error instanceof SigInException
            ? ERRORS_MAP_TO_USER.get(error.message)!
            : ERRORS_MAP_TO_USER.get(ERRORS.UNEXPECTED)!;

        toast.show(userFriendlyMessage, { type: 'danger' });
      });
  };

  return (
    <LinearGradient
      colors={Object.values(COLORS.main)}
      style={styles.container}
      start={AppGradient.start}
      end={AppGradient.end}>
      <Text style={styles.title}>PoemIsa</Text>

      <Button
        style={styles.button}
        onPress={() => handleLogin()}
        disabled={Boolean(user)}>
        <Google size="25" color={COLORS.main.secondary} />
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </Button>

      <TouchableWithoutFeedback onPress={() => flipPoetry()}>
        <Animated.Image
          entering={FlipInXDown.duration(1000)}
          accessibilityRole="image"
          source={require('@/assets/images/login-picture.png')}
          style={[styles.image, animatedStyle]}
        />
      </TouchableWithoutFeedback>

      {!randomQuote ? (
        <Loading styles={styles.quoteContainer} />
      ) : (
        <FadeInView styles={styles.quoteContainer} duration={1000}>
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
    color: COLORS.main.primary
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
    borderColor: COLORS.main.primary,
    borderWidth: 2,
    padding: 10,
    backgroundColor: COLORS.main.secondary,
    opacity: 0.5
  }
});
