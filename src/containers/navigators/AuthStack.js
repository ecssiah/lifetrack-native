import { createStackNavigator } from 'react-navigation';
import createStyles from '../../styles';

import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

const styles = createStyles({});

const routeConfig = {
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
};

const navConfig = {
  initialRouteName: 'SignIn',
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerBackTitle: null,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
  },
};

export default createStackNavigator(routeConfig, navConfig);
