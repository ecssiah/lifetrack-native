import React from 'react'
import { createAppContainer } from 'react-navigation'

import NavigationService from '../../services/NavigationService'

import AppSwitch from '../navigators/AppSwitch'

const AppContainer = createAppContainer(AppSwitch)

class LTContainer extends React.Component
{
  _setNavigatorRef = ref => {
    NavigationService.setTopLevelNavigator(ref)
  }

  render() {
    return (
      <AppContainer ref={this._setNavigatorRef} /> 
    )
  }
}

export default LTContainer