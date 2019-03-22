import { createStackNavigator } from 'react-navigation';
import createStyles from '../../styles';

import SettingsScreen from '../screens/settings/SettingsScreen';
import CategoriesScreen from '../screens/settings/CategoriesScreen';
import UserScreen from '../screens/settings/UserScreen';

const styles = createStyles({});

const routeConfig = {
  Settings: SettingsScreen,
  Categories: CategoriesScreen,
  User: UserScreen,
};

const navConfig = {
  initialRouteName: 'Settings',
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerBackTitle: null,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
  },
};

export default createStackNavigator(routeConfig, navConfig);