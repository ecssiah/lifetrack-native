import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import createStyles, { Color, Font, FontSize } from '../../styles';

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
  _getDisplayTime() {
    const minutes = Math.floor(this.props.time).toFixed(0);
    const seconds = ((this.props.time - minutes) * 60).toFixed(0);

    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

    return `${displayMinutes}:${displaySeconds}`;
  };

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
          {this._getDisplayTime()}
        </Text>
      </TouchableOpacity>
    );
  };
};

export default FocusTimer;