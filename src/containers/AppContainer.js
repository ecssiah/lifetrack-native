import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import { 
  createSwitchNavigator,
  createStackNavigator, 
  createBottomTabNavigator, 
  createAppContainer 
} from "react-navigation";
import createStyles, { Color, FontSize, Font } from '../styles';

import SplashScreen from './screens/SplashScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import FocusesScreen from './screens/FocusesScreen';
import FocusEditScreen from './screens/FocusEditScreen';
import FocusScreen from './screens/FocusScreen';
import StatsScreen from './screens/StatsScreen';
import SettingsScreen from './screens/SettingsScreen';

const styles = createStyles({
  headerStyle: {
    backgroundColor: Color.primary,
  },
  headerTitleStyle: {
    fontFamily: Font.primary,
    fontSize: FontSize.headerTitle,
    fontWeight: 'bold',
  },
});

const AuthStack = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpScreen,
  },
  {
    initialRouteName: 'SignIn',
    defaultNavigationOptions: {
      headerTintColor: 'white',
      headerBackTitle: null,
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
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
      headerTintColor: 'white',
      headerBackTitle: null,
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
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
      headerTintColor: 'white',
      headerBackTitle: null,
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
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
      headerTintColor: 'white',
      headerBackTitle: null,
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
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
      style: styles.headerStyle,
    },
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        switch (navigation.state.routeName) {
          case 'Focuses': {
            return <Icon name={'ios-eye'} size={35} color={tintColor} />;
          }
          case 'Settings': {
            return <Icon name={'md-settings'} size={35} color={tintColor} />;
          }
          case 'Stats': {
            return <Icon name={'ios-podium'} size={35} color={tintColor} />;
          }
          default: {
            console.error('unhandled routeName: ' + navigation.state.routeName);
          }
        }
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