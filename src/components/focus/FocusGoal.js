import React from 'react';
import { ProgressViewIOS, Text, TouchableOpacity } from 'react-native';
import createStyles, { Color, FontSize } from '../../styles';

const styles = createStyles({
  container: {
    width: '80%',
  },
  heading: {
    alignSelf: 'center',
    marginVertical: 6,
    fontSize: FontSize.subtitle,
  },
  progress: {
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
        activeOpacity={0.7}
        style={styles.container}
        onPress={this.props.onGoalClick}
      >
        <Text style={styles.heading}>
          Goal: {this.props.goal}
        </Text>

        <ProgressViewIOS
          style={styles.progress}
          progressTintColor={Color.highlight}
          progress={this.props.periods / this.props.goal}
        />
      </TouchableOpacity>
    );
  }
}

export default FocusGoal;