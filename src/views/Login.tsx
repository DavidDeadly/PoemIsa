import { View, Text, StyleSheet } from 'react-native';
import { Google } from 'iconsax-react-native';

import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/Button';
import { COLORS } from '@/constants';
import { useRandomQuote } from '@/hooks/useRandomQuote';
import { Quote } from '@/components/Quote';

export const Login = () => {
  const { user, loginWithGoogle } = useUser();
  const { randomQoute } = useRandomQuote();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PoemIsa</Text>

      <Button
        style={styles.button}
        onPress={loginWithGoogle}
        disabled={Boolean(user)}>
        <Google size="25" color={COLORS.secondary} />
        <Text style={styles.buttonText}>Iniciar sesión</Text>
      </Button>

      <Quote styles={styles.quoteContainer} quote={randomQoute} fontSize={20} />
    </View>
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
    gap: 10,
    marginBottom: 50
  },
  button: {
    flex: 4
  },
  buttonText: {
    color: '#fff'
  }
});
