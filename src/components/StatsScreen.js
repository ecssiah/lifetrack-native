import React from 'react';
import { View, Text } from 'react-native';
import createStyles from '../styles';

const styles = createStyles();

class StatsScreen extends React.Component {
  static navigationOptions = {
    title: 'Stats',
  };

  render() {
    return (
      <View style={styles.screen}>
      </View>
    );
  }
}

export default StatsScreen;