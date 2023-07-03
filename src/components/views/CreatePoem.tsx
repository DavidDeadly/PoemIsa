import { useNavigation } from '@react-navigation/native';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { SCREENS } from '@/constants';
import { Button } from '@/components';
import { PoemIsaStackParamList } from '@/types/components';

export const CreatePoem = () => {
  const navigation =
    useNavigation<StackNavigationProp<PoemIsaStackParamList>>();

  const goToWrite = () => navigation.navigate(SCREENS.APP.WRITE);
  const goToCapture = () => navigation.navigate(SCREENS.APP.CAPTURE);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Crear</Text>
      <Button onPress={goToWrite}>
        <Text style={styles.text}>Escribir</Text>
      </Button>
      <Button onPress={goToCapture}>
        <Text style={styles.text}>Capturar</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },
  text: {
    color: '#222'
  }
});
