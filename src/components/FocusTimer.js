import React from 'react';
import { Text } from 'react-native';
import createStyles from '../styles';

const styles = createStyles({
  working: {
    fontSize: 62,
    color: '#0011dd',
  },
  break: {
    fontSize: 62,
    color: '#dd1100',
  },
});

class FocusTimer extends React.PureComponent {
  render() {
    const timerStyle = this.props.active ? styles.working: styles.break;

    const minutes = Math.floor(this.props.time).toFixed(0);
    const seconds = ((this.props.time - minutes) * 60).toFixed(0);

    const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    const displaySeconds = seconds < 10 ? '0' + seconds : seconds;
    const displayTime = `${displayMinutes}:${displaySeconds}`;

    return (
      <Text style={timerStyle}>
        {displayTime}
      </Text>
    );
  }
}

export default FocusTimer;