import React from 'react';
import { Button, View } from 'react-native';

class FocusButton extends React.PureComponent {
  render() {
    return (
      <Button 
        title={this.props.text} 
        onPress={this.props.onClickStart} 
      />
    );
  }
};

export default FocusButton;