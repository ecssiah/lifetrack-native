import { createSwitchNavigator } from 'react-navigation'

import SplashScreen from '../screens/SplashScreen'
import AuthStack from './AuthStack'
import AppBottomNav from './AppBottomNav'

const routeConfig = {
  Splash: SplashScreen,
  Auth: AuthStack,
  App: AppBottomNav,
}

const navConfig = {
  initialRouteName: 'Splash',
}

export default createSwitchNavigator(routeConfig, navConfig)