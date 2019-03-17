import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import NavigationService from './src/services/NavigationService';

import LTStatus from './src/components/LT/LTStatus';
import RootReducer from './src/reducers/RootReducer';
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