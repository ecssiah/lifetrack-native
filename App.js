import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import firebase, { rrfConfig } from './src/config/fbConfig';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance  } from 'redux-firestore';

import NavigationService from './src/services/NavigationService';

import LTStatusBar from './src/components/LT/LTStatusBar';

import RootReducer from './src/reducers/RootReducer';
import AppContainer from './src/containers/AppContainer';

const store = createStore(
  RootReducer, 
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

class App extends React.Component 
{
  render() {
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider {...rrfProps}>
          <LTStatusBar />
          <AppContainer 
            ref={navigatorRef => {
              NavigationService.setTopLevelNavigator(navigatorRef);
            }} 
          />
        </ReactReduxFirebaseProvider>
      </Provider>
    );
  };
};

export default App;