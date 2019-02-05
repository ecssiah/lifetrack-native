import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  createStackNavigator, 
  createBottomTabNavigator, 
  createAppContainer 
} from "react-navigation";

import FocusScreen from '../components/FocusScreen';
import FocusesScreen from '../components/FocusesScreen';
import StatsScreen from '../components/StatsScreen';
import SettingsScreen from '../components/SettingsScreen';

import { Colors } from '../styles';

const FocusStack = createStackNavigator(
  {
    Focuses: FocusesScreen,
    Focus: FocusScreen,
  },
  {
    headerMode: 'none',
  },
)

const MainNavigator = createBottomTabNavigator(
  {
    Stats: {
      screen: StatsScreen
    },
    Focuses: FocusStack, 
    Settings: {
      screen: SettingsScreen
    },
  },
  {
    initialRouteName: 'Focuses',
    tabBarOptions: {
      activeTintColor: '#ffffff',
      inactiveTintColor: '#777777',
      showLabel: false,
      style: {
        backgroundColor: Colors.primary,
      },
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        if (routeName === 'Focuses') {
          iconName = 'ios-eye';
        } else if (routeName === 'Settings') {
          iconName = 'md-settings';
        } else if (routeName === 'Stats') {
          iconName = 'ios-podium';
        }

        return <Ionicons name={iconName} size={35} color={tintColor} />;
      },
    }),
  },
);

export default createAppContainer(MainNavigator);