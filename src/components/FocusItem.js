import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import createStyles, { Fonts, Colors } from '../styles'; 

const styles = createStyles({
  focusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  focusItem: {
    fontSize: Fonts.md,
    color: Colors.text,
  },
});

class FocusItem extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={styles.focusContainer}
        onPress={() => this.props.selectFocus(this.props.focus.id)}
      >
        <Text style={styles.focusItem}>{this.props.focus.name}</Text>
        <Text style={styles.focusItem}>{this.props.focus.category}</Text>
      </TouchableOpacity>
    );
  }
}

export default FocusItem;