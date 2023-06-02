import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StatusBar, StyleSheet, Text, View } from 'react-native';

import { PoemIsaStackParamList } from '@/types/components';
import { SCREENS } from '@/constants';
import { Button } from '@/components';

export const WritePoem = () => {
  const navigation =
    useNavigation<StackNavigationProp<PoemIsaStackParamList>>();

  const goToWrite = () => navigation.navigate(SCREENS.APP.CAPTURE);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Write</Text>
      <Button onPress={goToWrite}>
        <Text style={styles.text}>Go to Capture</Text>
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
