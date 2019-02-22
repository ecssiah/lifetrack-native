import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

class FocusGoal extends React.PureComponent {
  render() {
    return (
      <View>
        <Text>
          Goal:
        </Text>

        <TouchableOpacity
          onPress={this.props.onClickGoal}
        >
          <Text>
            {this.props.periods} - {this.props.goal}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default FocusGoal;