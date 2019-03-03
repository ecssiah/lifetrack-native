import React from 'react';
import { Text, View, ProgressViewIOS } from 'react-native';
import createStyles, { Color, FontSize } from '../styles';

const styles = createStyles({
  experienceContainer: {
    width: '80%',
  },
  experienceLevel: {
    alignSelf: 'center',
    fontSize: FontSize.subtitle,
    marginVertical: 10,
  },
  experienceProgress: {
    paddingHorizontal: 20,
    marginVertical: 10,
    transform: [
      { scaleX: 1.0 }, 
      { scaleY: 12.0 },
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
          progressTintColor={Color.highlight}
          progress={this.props.experience / 100.0}
        />
      </View>
    );
  }
}

export default FocusExperience;