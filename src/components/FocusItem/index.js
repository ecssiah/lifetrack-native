import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';

class FocusItem extends React.Component {
  render() {
    return (
      <View style={styles.focusContainer}>
        <Text style={styles.focusItem}>{this.props.focus.name}</Text>
        <Text style={styles.focusItem}>{this.props.focus.category}</Text>
      </View>
    );
  }
}

export default FocusItem;