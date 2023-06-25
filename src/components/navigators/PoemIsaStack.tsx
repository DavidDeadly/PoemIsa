import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PoemIsaStackParamList } from '@/types/components';
import { HomeTabs } from '@/components/navigators';
import { CapturePoem } from '@/components/views';
import { WritePoem } from '@/components/views';
import { COLORS, SCREENS } from '@/constants';

const Stack = createNativeStackNavigator<PoemIsaStackParamList>();

export const PoemIsaStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={SCREENS.APP.APP}
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.MAIN.SECONDARY
        }
      }}>
      <Stack.Screen
        name={SCREENS.APP.APP}
        component={HomeTabs}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen name={SCREENS.APP.WRITE} component={WritePoem} />
      <Stack.Screen name={SCREENS.APP.CAPTURE} component={CapturePoem} />
    </Stack.Navigator>
  );
};
