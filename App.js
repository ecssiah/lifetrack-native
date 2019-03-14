import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import LTStatusBar from './src/components/LT/LTStatusBar';

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
        <LTStatusBar />
        <AppContainer />
      </Provider>
    );
  };
};

export default App;