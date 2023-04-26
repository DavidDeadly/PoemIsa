import { View, Text } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin';

import { useUser } from '@/hooks/useUser';

export const Login = () => {
  const { user, loginWithGoogle } = useUser();

  return (
    <View>
      <Text>Please login</Text>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={loginWithGoogle}
        disabled={Boolean(user)}
      />
    </View>
  );
};
