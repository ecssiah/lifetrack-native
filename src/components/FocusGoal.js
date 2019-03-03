import React from 'react';
import { Text, TouchableOpacity, ProgressViewIOS, View } from 'react-native';
import createStyles, { Color, FontSize } from '../styles';

const styles = createStyles({
  goalContainer: {
    width: '80%',
  },
  goalHeading: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: FontSize.subtitle,
  },
  goalProgress: {
    width: '100%',
    marginVertical: 10,
    transform: [
      { scaleX: 1.0 }, 
      { scaleY: 12.0 },
    ],
  },
});

class FocusGoal extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity
        style={styles.goalContainer}
        onPress={this.props.onClickGoal}
      >
        <Text style={styles.goalHeading}>
          Goal: {this.props.goal}
        </Text>

        <ProgressViewIOS
          style={styles.goalProgress}
          progressTintColor={Color.highlight}
          progress={this.props.periods / this.props.goal}
        />
      </TouchableOpacity>
    );
  }
}

export default FocusGoal;