import React from 'react';
import { Text, View } from 'react-native';

class FocusTitle extends React.Component {
  render() {
    return (
      <Text>
        {this.props.name}
      </Text>
    );
  }
}

export default FocusTitle;