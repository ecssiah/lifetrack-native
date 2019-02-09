import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  createSwitchNavigator,
  createStackNavigator, 
  createBottomTabNavigator, 
  createAppContainer 
} from "react-navigation";
import firebase from 'firebase';

import SplashScreen from '../components/SplashScreen';
import FocusScreen from '../components/FocusScreen';
import FocusesScreen from '../components/FocusesScreen';
import StatsScreen from '../components/StatsScreen';
import SettingsScreen from '../components/SettingsScreen';

import { Colors } from '../styles';

const AuthStack = createStackNavigator(
  {
    Splash: SplashScreen,
  },
  {
    headerMode: 'none',
  },
);

const StatsStack = createStackNavigator(
  {
    Stats: StatsScreen,
  },
  {
    headerMode: 'none',
  },
);

const FocusStack = createStackNavigator(
  {
    Focuses: FocusesScreen,
    Focus: FocusScreen,
  },
  {
    headerMode: 'none',
  },
);

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  {
    headerMode: 'none',
  },
);

const AppNavigator = createBottomTabNavigator(
  {
    Stats: StatsStack,
    Focuses: FocusStack,
    Settings: SettingsStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      initialRouteName: 'Focuses',
      tabBarOptions: {
        activeTintColor: '#ffffff',
        inactiveTintColor: '#777777',
        showLabel: false,
        style: {
          backgroundColor: Colors.primary,
        },
      },
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

const AppSwitch = createSwitchNavigator(
  {
    Loading: SplashScreen,
    Auth: AuthStack,
    App: AppNavigator,
  },
  {
    headerMode: 'none',
  },
)


export default createAppContainer(AppSwitch);