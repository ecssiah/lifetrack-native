import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.section}>Settings Screen</Text>
      </View>
    );
  }
}

export default SettingsScreen;