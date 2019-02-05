import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

class FocusScreen extends React.Component {
  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.section}>Focus Screen</Text>
      </View>
    );
  }
}

export default FocusScreen;