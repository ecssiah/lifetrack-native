import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { 
  createSwitchNavigator,
  createStackNavigator, 
  createBottomTabNavigator, 
  createAppContainer 
} from "react-navigation";
import { Color, FontSize } from '../styles';

import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import FocusesScreen from './screens/FocusesScreen';
import FocusEditScreen from './screens/FocusEditScreen';
import FocusScreen from './screens/FocusScreen';
import StatsScreen from './screens/StatsScreen';
import SettingsScreen from './screens/SettingsScreen';

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  },
  {
    initialRouteName: 'SignIn',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Color.primary,
      },
      headerTitleStyle: {
        fontSize: FontSize.headerTitle,
        fontWeight: 'bold',
      },
      headerTintColor: 'white',
      headerBackTitle: null,
    },
  },
);

const StatsStack = createStackNavigator(
  {
    Stats: StatsScreen,
  },
  {
    initialRouteName: 'Stats',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Color.primary,
      },
      headerTintColor: 'white',
      headerBackTitle: null,
      headerTitleStyle: {
        fontSize: FontSize.headerTitle,
        fontWeight: 'bold',
      },
    },
  },
);

const FocusStack = createStackNavigator(
  {
    Focuses: FocusesScreen,
    FocusEdit: FocusEditScreen,
    Focus: FocusScreen,
  },
  {
    initialRouteName: 'Focuses',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Color.primary,
      },
      headerTintColor: 'white',
      headerBackTitle: null,
      headerTitleStyle: {
        fontSize: FontSize.headerTitle,
        fontWeight: 'bold',
      },
    },
  },
);

const SettingsStack = createStackNavigator(
  {
    Settings: SettingsScreen,
  },
  {
    initialRouteName: 'Settings',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Color.primary,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontSize: FontSize.headerTitle,
        fontWeight: 'bold',
      },
    },
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
        backgroundColor: Color.primary,
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

        return <Icon name={iconName} size={35} color={tintColor} />;
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
    initialRouteName: 'Splash',
  },
);

export default createAppContainer(AppSwitch);