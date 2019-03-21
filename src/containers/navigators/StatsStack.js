import { createStackNavigator } from 'react-navigation';
import createStyles from '../../styles';

import StatsScreen from '../screens/stats/StatsScreen';

const styles = createStyles({});

const routeConfig = {
  Stats: StatsScreen,
};

const navConfig = {
  initialRouteName: 'Stats',
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerBackTitle: null,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
  },
};

export default createStackNavigator(routeConfig, navConfig);