import React from 'react';
import { View, Text, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import createStyles from './src/styles';

import rootReducer from './src/reducers'

import MainNavigator from './src/containers/MainNavigator';

const styles = createStyles();

const store = createStore(rootReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.statusBar}>
          <StatusBar barStyle="light-content" />
        </View>

        <MainNavigator />
      </Provider>
    );
  }
}