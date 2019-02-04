import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from './src/reducers'

const store = createStore(rootReducer);

import FocusesScreen from './src/components/FocusesScreen';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <FocusesScreen />
      </Provider>
    );
  }
}