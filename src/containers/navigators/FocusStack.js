import { createStackNavigator } from 'react-navigation';
import createStyles from '../../styles';

import FocusesScreen from '../screens/focuses/FocusesScreen';
import FocusScreen from '../screens/focuses/FocusScreen';
import FocusEditScreen from '../screens/focuses/FocusEditScreen';

const styles = createStyles({});

const routeConfig = {
  Focuses: FocusesScreen,
  Focus: FocusScreen,
  FocusEdit: FocusEditScreen,
};

const navConfig = {
  initialRouteName: 'Focuses',
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerBackTitle: null,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
  },
};

export default createStackNavigator(routeConfig, navConfig);