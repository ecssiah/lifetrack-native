import React from 'react';
import { View } from 'react-native';
import createStyles from '../../styles';

const styles = createStyles({
  separator: {
    height: 1,
    backgroundColor: '#ced0ce',
    marginHorizontal: '3%',
  },
});

class LTSeparator extends React.Component 
{
  render() {
    return (
      <View style={styles.separator} />
    );
  };
};

export default LTSeparator;