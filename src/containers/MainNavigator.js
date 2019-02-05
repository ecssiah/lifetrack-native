import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import FocusesScreen from '../components/FocusesScreen';
import StatsScreen from '../components/StatsScreen';
import SettingsScreen from '../components/SettingsScreen';

import { Colors } from '../styles';

const MainNavigator = createBottomTabNavigator(
  {
    Stats: {
      screen: StatsScreen
    },
    Focuses: {
      screen: FocusesScreen
    },
    Settings: {
      screen: SettingsScreen
    },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        if (focused) tintColor = '#ffffff';

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
    tabBarOptions: {
      showLabel: false,
      style: {
        backgroundColor: Colors.statusBar,
      },
    },
  },
);

export default createAppContainer(MainNavigator);