import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import NavigationService from './src/services/NavigationService';

import RootReducer from './src/reducers/RootReducer';

import LTStatus from './src/containers/LT/LTStatus';
import AppContainer from './src/containers/AppContainer';

const store = createStore(
  RootReducer, 
);

class App extends React.Component 
{
  render() {
    return (
      <Provider store={store}>
        <LTStatus />
        <AppContainer 
          ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }} 
        />
      </Provider>
    );
  };
};

export default App;