import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.section}>Login Screen</Text>
      </View>
    );
  }
}

export default LoginScreen;