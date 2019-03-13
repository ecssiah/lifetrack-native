import React from 'react';
import { Text, View, ProgressViewIOS } from 'react-native';
import createStyles, { Color, FontSize } from '../../styles';

import LTText from '../LT/LTText';

const styles = createStyles({
  container: {
    width: '80%',
  },
  level: {
    alignSelf: 'center',
    fontSize: FontSize.subtitle,
    marginVertical: 10,
  },
  progress: {
    transform: [
      { scaleX: 1.0 }, 
      { scaleY: 12.0 },
    ],
    paddingHorizontal: 20,
    marginVertical: 10,
  }
});

class FocusExperience extends React.PureComponent 
{
  render() {
    return (
      <View style={styles.container}>
        <LTText style={styles.level}>
          {"Level: " + this.props.level}
        </LTText>

        <ProgressViewIOS
          style={styles.progress}
          progressTintColor={Color.highlight}
          progress={this.props.experience / 100}
        />
      </View>
    );
  };
};

export default FocusExperience;