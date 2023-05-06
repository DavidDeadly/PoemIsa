import { Text, StyleSheet, Image } from 'react-native';
import { Google } from 'iconsax-react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/Button';
import { COLORS } from '@/constants';
import { useRandomQuote } from '@/hooks/useRandomQuote';
import { Quote } from '@/components/Quote';
import { FadeInView } from '@/components/FadeInView';
import { Loading } from '@/components/Loading';

const AppGradient = {
  start: { x: 1, y: 1 },
  end: { x: 0, y: 0 }
};

export const Login = () => {
  const { user, loginWithGoogle } = useUser();
  const { randomQoute } = useRandomQuote();

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

      <Image
        source={require('@/assets/images/login-picture.png')}
        style={styles.image}
      />

      {!randomQoute ? (
        <Loading styles={styles.quoteContainer} />
      ) : (
        <FadeInView styles={styles.quoteContainer} duration={1000}>
          <Quote quote={randomQoute} fontSize={20} />
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
