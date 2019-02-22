import React from 'react';
import { View, Text } from 'react-native';
import createStyles from '../styles';

const styles = createStyles({
  levelHeading: {
    alignSelf: 'center',
    margin: 10,
    fontSize: 32,
  },
});

class FocusLevel extends React.PureComponent {
  render() {
    return (
      <Text style={styles.levelHeading}>
        {"Level: " + this.props.level}
      </Text>
    );
  }
}

export default FocusLevel;