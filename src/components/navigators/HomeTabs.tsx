/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  Home3 as HomeIcon,
  Add as AddIcon,
  Profile as ProfileIcon
} from 'iconsax-react-native';
import { TouchableOpacity } from 'react-native';

import { CreatePoem } from '@/components/views';
import { Home } from '@/components/views';
import { Profile } from '@/components/views';
import { TabBarIcon } from '@/components';
import { SCREENS } from '@/constants';
import { PoemIsaHomeTabsParamList } from '@/types/components/navigators/PoemIsaStack';

const Tab = createBottomTabNavigator<PoemIsaHomeTabsParamList>();

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName={SCREENS.MAIN.HOME}
      screenOptions={{
        tabBarInactiveTintColor: '#c8a9e5',
        tabBarActiveTintColor: '#823bc4',
        tabBarButton: props => <TouchableOpacity {...props} />,
        tabBarStyle: {
          backgroundColor: '#D8F8F5',
          height: 55
        },
        tabBarAllowFontScaling: true,
        tabBarHideOnKeyboard: true,
        tabBarItemStyle: {
          paddingVertical: 8
        },
        headerShown: false
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: props => <TabBarIcon {...props} TabIcon={HomeIcon} />
        }}
        name={SCREENS.MAIN.HOME}
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <TabBarIcon {...props} TabIcon={AddIcon} />
        }}
        name={SCREENS.MAIN.CREATE}
        component={CreatePoem}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <TabBarIcon {...props} TabIcon={ProfileIcon} />
        }}
        name={SCREENS.MAIN.PROFILE}
        component={Profile}
      />
    </Tab.Navigator>
  );
};
