import React from 'react';
import { 
  Text, TouchableOpacity, View 
} from 'react-native';
import createStyles, { FontSize } from '../styles'; 

const styles = createStyles({
  focusHeaderContainerActive: {
    backgroundColor: '#777777',
    borderTopWidth: 1,
    borderTopColor: '#888888',
    borderBottomWidth: 1,
    borderBottomColor: '#666666',
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
    fontSize: FontSize.sectionHeader,
    marginLeft: 4,
    marginVertical: 2,
  },
  focusHeaderTextInactive: {
    color: '#a0a0a0',
    fontSize: FontSize.sectionHeader,
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