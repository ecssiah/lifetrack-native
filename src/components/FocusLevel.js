import React from 'react';
import { View, Text } from 'react-native';

class FocusLevel extends React.PureComponent {
  render() {
    return (
      <Text>
        {this.props.level}
      </Text>
    );
  }
}

export default FocusLevel;