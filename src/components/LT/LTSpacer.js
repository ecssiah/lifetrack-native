import React from 'react';
import { View } from 'react-native';
import { Size } from '../../styles';

class LTSpacer extends React.Component
{
  _getStyle() {
    let style = { width: Size.small, height: Size.small };

    if (this.props.small) {
      style = { width: Size.small, height: Size.small };
    }

    if (this.props.medium) {
      style = { width: Size.medium, height: Size.medium };
    }

    if (this.props.large) {
      style = { width: Size.large, height: Size.large };
    }

    if (this.props.width) {
      style.width = this.props.width;
    }

    if (this.props.height) {
      style.height = this.props.height;
    }

    return style;
  };

  render() {
    return <View style={[this._getStyle(), this.props.style]} />;
  };
};

export default LTSpacer;