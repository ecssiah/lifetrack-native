import React from 'react';
import { Text, View, ProgressViewIOS } from 'react-native';
import createStyles, { Colors } from '../styles';

const styles = createStyles({
  experienceContainer: {
    width: '80%',
  },
  experienceLevel: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 32,
  },
  experienceProgress: {
    paddingHorizontal: 20,
    marginVertical: 10,
    transform: [
      { scaleX: 1.0 }, 
      { scaleY: 10.0 },
    ],
  }
});

class FocusExperience extends React.PureComponent {
  render() {
    return (
      <View style={styles.experienceContainer}>
        <Text style={styles.experienceLevel}>
          {"Level: " + this.props.level}
        </Text>

        <ProgressViewIOS
          style={styles.experienceProgress}
          progressTintColor={Colors.primary}
          progress={this.props.experience / 100.0}
        />
      </View>
    );
  }
}

export default FocusExperience;