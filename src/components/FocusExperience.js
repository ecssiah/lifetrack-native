import React from 'react';
import { View, Text } from 'react-native';

class FocusExperience extends React.PureComponent {
  render() {
    return (
      <View>
        <Text>
          {this.props.experience}
        </Text>
      </View>
    );
  }
}

export default FocusExperience;