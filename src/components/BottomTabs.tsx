/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../views/Home';
import { Capture } from '../views/Capture';
import { Profile } from '../views/Profile';
import {
  Home3 as HomeIcon,
  Add as AddIcon,
  Profile as ProfileIcon
} from 'iconsax-react-native';
import { TouchableOpacity } from 'react-native';
import { TabBarIcon } from './TabBarIcon';

const Tab = createBottomTabNavigator();

export const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
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
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <TabBarIcon {...props} TabIcon={AddIcon} />
        }}
        name="Capture"
        component={Capture}
      />
      <Tab.Screen
        options={{
          tabBarIcon: props => <TabBarIcon {...props} TabIcon={ProfileIcon} />
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};
