import React from 'react';
import { Text } from 'react-native';
import createStyles, { Font } from '../../styles';

const styles = createStyles({
  LTText: {
    fontFamily: Font.primary,
  },
});

class LTText extends React.Component
{
  render() {
    return (
      <Text style={[styles.LTText, this.props.style]}>
        {this.props.children}
      </Text>
    );
  };
};

export default LTText;