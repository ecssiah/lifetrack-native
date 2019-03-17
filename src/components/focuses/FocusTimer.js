import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import createStyles, { Color, Font, FontSize } from '../../styles';
import { displayTime } from '../../utils';

const styles = createStyles({
  working: {
    fontSize: FontSize.timer,
    fontFamily: Font.timer,
    textAlign: 'center',
    color: Color.working,
  },
  paused: {
    fontSize: FontSize.timer,
    fontFamily: Font.timer,
    textAlign: 'center',
    color: Color.highlight,
  },
  break: {
    fontSize: FontSize.timer,
    fontFamily: Font.timer,
    textAlign: 'center',
    color: Color.break,
  },
});

class FocusTimer extends React.PureComponent 
{
  _getTimerStyle() {
    if (this.props.working) {
      return this.props.active ? styles.working : styles.paused;
    } else {
      return styles.break;
    }
  };

  render() {
    return (
      <TouchableOpacity 
        activeOpacity={0.6}
        onPress={this.props.onActivate} 
      >
        <Text style={this._getTimerStyle()}>
          {displayTime(this.props.time)}
        </Text>
      </TouchableOpacity>
    );
  };
};

export default FocusTimer;