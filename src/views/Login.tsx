import { View, Text, StyleSheet } from 'react-native';
import { Google } from 'iconsax-react-native';

import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/Button';
import { COLORS } from '@/constants';
import { useRandomQuote } from '@/hooks/useRandomQuote';

export const Login = () => {
  const { user, loginWithGoogle } = useUser();
  const [randomQoute] = useRandomQuote();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PoemIsa</Text>

      <Button
        style={styles.button}
        Icon={Google}
        text="Iniciar sesión"
        onPress={loginWithGoogle}
        disabled={Boolean(user)}
      />

      {randomQoute && (
        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>{randomQoute.content}</Text>
          <Text style={styles.author}>~{randomQoute.author}~</Text>
        </View>
      )}
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
    gap: 10
  },
  quote: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-BoldItalic'
  },
  author: {
    fontSize: 20,
    fontFamily: 'MontserratAlternates-LightItalic'
  },
  button: {
    flex: 4
  }
});
