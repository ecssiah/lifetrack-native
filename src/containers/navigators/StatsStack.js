import { createStackNavigator } from 'react-navigation'
import createStyles from '../../styles'

import StatsScreen from '../screens/stats/StatsScreen'
import HelpScreen from '../screens/help/HelpScreen';

const styles = createStyles({})

const routeConfig = {
  Stats: StatsScreen,
  StatsHelp: HelpScreen,
}

const navConfig = {
  initialRouteName: 'Stats',
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerBackTitle: null,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
  },
}

export default createStackNavigator(routeConfig, navConfig)