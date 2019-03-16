import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import firebase, { rrfConfig } from './src/config/fbConfig';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore } from 'redux-firestore';

import NavigationService from './src/services/NavigationService';

import LTStatusBar from './src/components/LT/LTStatusBar';

import RootReducer from './src/reducers/RootReducer';
import AppContainer from './src/containers/AppContainer';

const store = createStore(
  RootReducer, 
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase,  getFirestore })),
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase),
  ),
);

class App extends React.Component 
{
  render() {
    return (
      <Provider store={store}>
        <LTStatusBar />
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