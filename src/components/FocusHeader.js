import React from 'react';
import { 
  Text, View 
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
    margin: 2,
  },
});

class FocusHeader extends React.Component {
  render() {
    return (
      <View style={styles.focusHeaderContainer}>
        <Text style={styles.focusHeaderText}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

export default FocusHeader;