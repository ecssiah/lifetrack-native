import React from 'react';
import { 
  Text, TouchableOpacity, View 
} from 'react-native';
import createStyles from '../styles'; 

const styles = createStyles({
  focusHeaderContainerActive: {
    backgroundColor: '#666666',
    borderTopWidth: 1,
    borderTopColor: '#777777',
    borderBottomWidth: 1,
    borderBottomColor: '#555555',
  },
  focusHeaderContainerInactive: {
    backgroundColor: '#505050',
    borderTopWidth: 1,
    borderTopColor: '#606060',
    borderBottomWidth: 1,
    borderBottomColor: '#404040',
  },
  focusHeaderTextActive: {
    color: 'white',
    fontSize: 18,
    marginLeft: 4,
    marginVertical: 2,
  },
  focusHeaderTextInactive: {
    color: '#b0b0b0',
    fontSize: 18,
    marginLeft: 4,
    marginVertical: 2,
  },
});

class FocusHeader extends React.Component {

  _getHeaderStyle = () => {
    if (this.props.active) {
      return styles.focusHeaderTextActive;
    } else {
      return styles.focusHeaderTextInactive;
    }
  };

  _getHeaderContainerStyle = () => {
    if (this.props.active) {
      return styles.focusHeaderContainerActive;
    } else {
      return styles.focusHeaderContainerInactive;
    }
  };

  render() {
    return (
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={() => this.props.selectCategory(this.props.title)}
      >
        <View style={this._getHeaderContainerStyle()}>
          <Text style={this._getHeaderStyle()}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default FocusHeader;