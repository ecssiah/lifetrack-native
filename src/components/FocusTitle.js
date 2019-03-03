import React from 'react';
import { Text, View } from 'react-native';
import createStyles from '../styles';

const styles = createStyles({
  focusTitle: {
    fontSize: 52,
    textAlign: 'center',
  },
});

class FocusTitle extends React.PureComponent {
  render() {
    return (
      <Text style={styles.focusTitle}>
        {this.props.name}
      </Text>
    );
  }
}

export default FocusTitle;