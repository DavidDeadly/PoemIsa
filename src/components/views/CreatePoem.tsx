import { useNavigation } from '@react-navigation/native';
import { StatusBar, StyleSheet, Text } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { SCREENS } from '@/constants';
import { Button } from '@/components';
import { PoemIsaStackParamList } from '@/types/components';
import { PoemIsaGradient } from '@/components/PoemIsaGradient';

const CreateGradient = {
  start: { x: 2, y: 0 },
  end: { x: 0, y: 2 }
};

export const CreatePoem = () => {
  const navigation =
    useNavigation<StackNavigationProp<PoemIsaStackParamList>>();

  const goToWrite = () => navigation.navigate(SCREENS.APP.WRITE);
  const goToCapture = () => navigation.navigate(SCREENS.APP.CAPTURE);

  return (
    <PoemIsaGradient
      label="createPoem"
      style={container}
      gradient={CreateGradient}>
      <Button onPress={goToWrite}>
        <Text style={text}>Escribir</Text>
      </Button>
      <Button onPress={goToCapture}>
        <Text style={text}>Capturar</Text>
      </Button>
    </PoemIsaGradient>
  );
};

const { container, text } = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight
  },
  text: {
    color: '#222',
    fontSize: 20
  }
});
