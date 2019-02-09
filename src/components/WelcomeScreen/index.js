import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

class WelcomeScreen extends React.Component {
  render() {
    return (
      <View style={[styles.container]}>
        <Text style={styles.welcomeTitle}>LifeTrack</Text>
      </View>
    );
  }
}

export default WelcomeScreen;