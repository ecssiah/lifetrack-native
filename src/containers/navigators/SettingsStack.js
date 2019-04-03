import { createStackNavigator } from 'react-navigation'
import createStyles from '../../styles'

import SettingsScreen from '../screens/settings/SettingsScreen'
import CategoriesScreen from '../screens/settings/CategoriesScreen'
import ProfileScreen from '../screens/settings/ProfileScreen'

const styles = createStyles({})

const routeConfig = {
  Settings: SettingsScreen,
  Categories: CategoriesScreen,
  Profile: ProfileScreen,
}

const navConfig = {
  initialRouteName: 'Settings',
  defaultNavigationOptions: {
    headerTintColor: 'white',
    headerBackTitle: null,
    headerStyle: styles.headerStyle,
    headerTitleStyle: styles.headerTitleStyle,
  },
}

export default createStackNavigator(routeConfig, navConfig)