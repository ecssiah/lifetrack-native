import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import createStyles, { Fonts } from '../styles';

const fontSize = 140;

const styles = createStyles({
  working: {
    fontSize,
    fontFamily: Fonts.timer,
    textAlign: 'center',
    color: '#0022ee',
  },
  paused: {
    fontSize,
    fontFamily: Fonts.timer,
    textAlign: 'center',
    color: '#990033',
  },
  break: {
    fontSize,
    fontFamily: Fonts.timer,
    textAlign: 'center',
    color: '#227755',
  },
});

class FocusTimer extends React.PureComponent {
  _getDisplayTime() {
    const minutes = Math.floor(this.props.time).toFixed(0);
    const seconds = ((this.props.time - minutes) * 60).toFixed(0);

    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    const displaySeconds = seconds < 10 ? '0' + seconds : seconds;

    return `${displayMinutes}:${displaySeconds}`;
  };

  _getTimerStyle() {
    if (this.props.working) {
      if (this.props.active) {
        return styles.working;
      } else {
        return styles.paused;
      }
    } else {
      return styles.break;
    }
  };

  render() {
    return (
      <TouchableOpacity onPress={this.props.onActivate} >
        <Text style={this._getTimerStyle()}>
          {this._getDisplayTime()}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default FocusTimer;