import React from 'react'
import { Provider } from 'react-redux'

import reduxStore from './src/config/reduxConfig'

import LTStatus from './src/containers/LT/LTStatus'
import LTContainer from './src/containers/LT/LTContainer'

class App extends React.Component 
{
  render() {
    return (
      <Provider store={reduxStore}>
        <LTStatus />
        <LTContainer />
      </Provider>
    )
  }
}

export default App