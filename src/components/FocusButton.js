import React from 'react';
import { Button, View } from 'react-native';
import createStyles from '../styles';

const styles = createStyles({
  startButton: {
    fontSize: 58,
  },
});

class FocusButton extends React.PureComponent {
  render() {
    return (
      <Button 
        title={this.props.text} 
        style={styles.startButton}
        onPress={this.props.onClickStart} 
      />
    );
  }
};

export default FocusButton;