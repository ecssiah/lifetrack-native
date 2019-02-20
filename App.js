import React from 'react';
import { View, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import createStyles from './src/styles';
import RootReducer from './src/reducers/RootReducer';

import AppContainer from './src/containers/AppContainer';

const styles = createStyles();

const store = createStore(RootReducer);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.statusBar}>
          <StatusBar barStyle="light-content" />
        </View>

        <AppContainer />
      </Provider>
    );
  }
}

export default App;