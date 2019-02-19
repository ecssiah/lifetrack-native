import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import styles from './style';

class FocusItem extends React.Component {
  selectFocus = name => {
    console.warn(name);
  }

  render() {
    return (
      <TouchableOpacity
        style={styles.focusContainer}
        onPress={() => this.selectFocus(this.props.focus.id)}
      >
        <Text style={styles.focusItem}>{this.props.focus.name}</Text>
        <Text style={styles.focusItem}>{this.props.focus.category}</Text>
      </TouchableOpacity>
    );
  }
}

export default FocusItem;