import { Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Google } from 'iconsax-react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { FlipInXDown } from 'react-native-reanimated';

import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/Button';
import { COLORS } from '@/constants';
import { Quote } from '@/components/Quote';
import { FadeInView } from '@/components/FadeInView';
import { Loading } from '@/components/Loading';
import { useLoginFlipQuote } from '@/hooks/useLoginFlipQuote';

const AppGradient = {
  start: { x: 1, y: 1 },
  end: { x: 0, y: 0 }
};

export const Login = () => {
  const { user, loginWithGoogle } = useUser();
  const { randomQuote, flipPoetry, animatedStyle } = useLoginFlipQuote({
    delayTime: 500
  });

  return (
    <LinearGradient
      colors={Object.values(COLORS)}
      style={styles.container}
      start={AppGradient.start}
      end={AppGradient.end}>
      <Text style={styles.title}>PoemIsa</Text>

      <Button
        style={styles.button}
        onPress={loginWithGoogle}
        disabled={Boolean(user)}>
        <Google size="25" color={COLORS.secondary} />
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </Button>

      <TouchableWithoutFeedback onPress={() => flipPoetry()}>
        <Animated.Image
          entering={FlipInXDown.duration(1000)}
          testID="login-image"
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
    paddingHorizontal: 20
  },
  title: {
    fontSize: 60,
    marginTop: 60,
    fontFamily: 'MontserratAlternates-ExtraBoldItalic',
    flex: 1,
    fontWeight: '600',
    color: COLORS.primary
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
    borderColor: COLORS.primary,
    borderWidth: 2,
    padding: 10,
    backgroundColor: COLORS.secondary,
    opacity: 0.5
  }
});
