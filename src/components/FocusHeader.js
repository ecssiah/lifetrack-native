import React from 'react';
import { 
  Text, TouchableOpacity, View 
} from 'react-native';
import createStyles from '../styles'; 

const styles = createStyles({
  focusHeaderContainer: {
    backgroundColor: '#666666',
    borderTopWidth: 1,
    borderTopColor: '#777777',
    borderBottomWidth: 1,
    borderBottomColor: '#555555',
  },
  focusHeaderText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 4,
    marginVertical: 2,
  },
});

class FocusHeader extends React.Component {
  render() {
    return (
      <TouchableOpacity 
        activeOpacity={0.9} 
        onPress={() => this.props.selectCategory(this.props.title)}
      >
        <View style={styles.focusHeaderContainer}>
          <Text style={styles.focusHeaderText}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default FocusHeader;