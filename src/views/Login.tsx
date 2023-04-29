import { View, Text, StyleSheet } from 'react-native';
import { Google } from 'iconsax-react-native';

import { useUser } from '@/hooks/useUser';
import { Button } from '@/components/Button';
import { COLORS } from '@/constants';

export const Login = () => {
  const { user, loginWithGoogle } = useUser();

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
    alignItems: 'center'
  },
  title: {
    fontSize: 60,
    marginTop: 60,
    fontFamily: 'MontserratAlternates-ExtraBoldItalic',
    flex: 1,
    fontWeight: '600',
    color: COLORS.primary
  },
  button: {
    flex: 4
  }
});
