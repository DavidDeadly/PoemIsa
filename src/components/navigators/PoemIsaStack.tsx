import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { PoemIsaStackParamList } from '@/types/components';
import { HomeTabs } from '@/components/navigators';
import { CapturePoem } from '@/components/views';
import { WritePoem } from '@/components/views';
import { COLORS, SCREENS } from '@/constants';
import { PoemDetailed } from '@/components/views/PoemDetailed';

const Stack = createNativeStackNavigator<PoemIsaStackParamList>();

export const PoemIsaStack = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName={SCREENS.APP.APP}
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.MAIN.SECONDARY
          },
          headerShown: false,
          statusBarAnimation: 'slide',
          statusBarTranslucent: true,
          statusBarColor: 'transparent',
          statusBarStyle: 'dark'
        }}>
        <Stack.Screen name={SCREENS.APP.APP} component={HomeTabs} />
        <Stack.Screen name={SCREENS.APP.WRITE} component={WritePoem} />
        <Stack.Screen name={SCREENS.APP.CAPTURE} component={CapturePoem} />
        <Stack.Screen
          name={SCREENS.APP.POEM_DETAILED}
          component={PoemDetailed}
        />
      </Stack.Navigator>
    </>
  );
};
