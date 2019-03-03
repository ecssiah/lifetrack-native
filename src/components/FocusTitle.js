import React from 'react';
import { Text, View } from 'react-native';
import createStyles, { Color } from '../styles';

const styles = createStyles({
  focusTitleBackground: {
    alignSelf: 'stretch',
    backgroundColor: '#bbbbbb',
    borderColor: Color.primary,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 84,
  },
  focusTitleText: {
    fontSize: 38,
    color: '#444444',
    textShadowOffset: { width: -2, height: 1 },
    textShadowColor: 'black',
    textShadowRadius: 0,
    textAlign: 'center',
    paddingHorizontal: 4,
    paddingVertical: 12,
  },
});

class FocusTitle extends React.PureComponent {
  render() {
    return (
      <View style={styles.focusTitleBackground}>
        <Text style={styles.focusTitleText}>
          {this.props.name}
        </Text>
      </View>
    );
  }
}

export default FocusTitle;