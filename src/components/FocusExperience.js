import React from 'react';
import { View, Text, ProgressViewIOS } from 'react-native';
import createStyles, { Colors } from '../styles';

const styles = createStyles({
  experienceContainer: {
    width: '80%',
  },
  experienceProgress: {
    width: '100%',
    transform: [
      { scaleX: 1.0 }, 
      { scaleY: 10.0 },
    ],
  }
});

class FocusExperience extends React.PureComponent {
  render() {
    return (
      <View style={styles.experienceContainer} >
        <ProgressViewIOS
          progress={this.props.experience / 100.0}
          progressTintColor={Colors.primary}
          style={styles.experienceProgress}
        />
      </View>
    );
  }
}

export default FocusExperience;