import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

class StatsScreen extends React.Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.section}>Stats Screen</Text>
      </View>
    );
  }
}

export default StatsScreen;