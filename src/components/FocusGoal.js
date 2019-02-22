import React from 'react';
import { Text, TouchableOpacity, ProgressViewIOS, View } from 'react-native';
import createStyles from '../styles';

const styles = createStyles({
  goalContainer: {
    width: '80%',
  },
  goalHeading: {
    alignSelf: 'center',
    margin: 10,
    fontSize: 32,
  },
  goalProgress: {
    width: '100%',
    transform: [
      { scaleX: 1.0 }, 
      { scaleY: 10.0 },
    ],
  },
});

class FocusGoal extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onClickGoal}
        style={styles.goalContainer}
      >
        <Text style={styles.goalHeading}>
          Goal:
        </Text>

        <ProgressViewIOS
          progress={this.props.periods / this.props.goal}
          style={styles.goalProgress}
        />
      </TouchableOpacity>
    );
  }
}

export default FocusGoal;