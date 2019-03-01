import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import createStyles from '../styles';

const styles = createStyles({
  iconBase: {
    alignItems: 'center',
    width: 38, 
  },
});

class LTIcon extends React.Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={1.0}
        style={styles.iconBase}
        onPress={this.props.onPress}
      >
        <Ionicon
          name={this.props.type} 
          size={this.props.size} 
          color='#ffffff' 
        />
      </TouchableOpacity>
    );
  };
};

export default LTIcon;