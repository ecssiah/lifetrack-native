import React from 'react';
import { Text, View } from 'react-native';
import createStyles, { Color } from '../styles';

const styles = createStyles({
  background: {
    alignSelf: 'stretch',
    backgroundColor: '#bbbbbb',
    borderColor: Color.primary,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 84,
  },
  title: {
    fontSize: 38,
    color: '#444444',
    textAlign: 'center',
    textShadowOffset: { width: -2, height: 1 },
    textShadowColor: 'black',
    textShadowRadius: 0,
    paddingHorizontal: 4,
    paddingVertical: 12,
  },
});

class FocusTitle extends React.PureComponent {
  render() {
    return (
      <View style={styles.background}>
        <Text style={styles.title}>
          {this.props.name}
        </Text>
      </View>
    );
  }
}

export default FocusTitle;