import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import createStyles from '../styles';

const styles = createStyles({
  working: {
    fontSize: 140,
    color: '#0022ee',
  },
  paused: {
    fontSize: 140,
    color: '#990033',
  },
  break: {
    fontSize: 140,
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