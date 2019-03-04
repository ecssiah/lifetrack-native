import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import LTStatusBar from './src/components/LT/LTStatusBar';
import AppContainer from './src/containers/AppContainer';
import RootReducer from './src/reducers/RootReducer';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  RootReducer, 
  applyMiddleware(sagaMiddleware)
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <LTStatusBar />
        <AppContainer />
      </Provider>
    );
  }
}

export default App;