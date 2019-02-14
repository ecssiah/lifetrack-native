import React from "react";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { 
  createSwitchNavigator,
  createStackNavigator, 
  createBottomTabNavigator, 
  createAppContainer 
} from "react-navigation";

import SplashScreen from '../components/SplashScreen';

import SignInScreen from '../components/SignInScreen';
import SignUpScreen from '../components/SignUpScreen';

import FocusesScreen from '../components/FocusesScreen';
import FocusScreen from '../components/FocusScreen';
import StatsScreen from '../components/StatsScreen';
import SettingsScreen from '../components/SettingsScreen';

import { Colors } from '../styles';

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'SignIn',
  },
);

const StatsStack = createStackNavigator(
  {
    Stats: StatsScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Stats',
  },
);

const FocusStack = createStackNavigator(
  {
    Focuses: FocusesScreen,
    Focus: FocusScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Focuses',
  },
);

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Settings',
  },
);

const AppNavigator = createBottomTabNavigator(
  {
    Stats: StatsStack,
    Focuses: FocusStack,
    Settings: SettingsStack,
  },
  {
    initialRouteName: 'Focuses',
    tabBarOptions: {
      activeTintColor: 'white',
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

const AppSwitch = createSwitchNavigator(
  {
    Splash: SplashScreen,
    Auth: AuthStack,
    App: AppNavigator,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Splash',
  },
)


export default createAppContainer(AppSwitch);