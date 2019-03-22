import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import createStyles from '../../styles';

const styles = createStyles({
  iconBase: {
    width: 38, 
    alignItems: 'center',
    marginHorizontal: 4, 
  },
});

class LTIcon extends React.Component 
{
  render() {
    return (
      <TouchableOpacity
        activeOpacity={1.0}
        style={styles.iconBase}
        onPress={this.props.onPress}
      >
        <Ionicon
          color='#ffffff' 
          name={this.props.type} 
          size={this.props.size} 
        />
      </TouchableOpacity>
    );
  };
};

export default LTIcon;