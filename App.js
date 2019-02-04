import React from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import rootReducer from './src/reducers'

const store = createStore(rootReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <Text>Hello!</Text>
        </View>
      </Provider>
    );
  }
}