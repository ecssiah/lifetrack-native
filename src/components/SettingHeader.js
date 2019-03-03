import React from 'react';
import { 
  Text, View 
} from 'react-native';
import createStyles, { FontSize } from '../styles'; 

const styles = createStyles({
  settingsHeaderContainer: {
    backgroundColor: '#666666',
    borderTopWidth: 1,
    borderTopColor: '#777777',
    borderBottomWidth: 1,
    borderBottomColor: '#555555',
  },
  settingsHeaderText: {
    color: 'white',
    fontSize: FontSize.sectionHeader,
    marginLeft: 4,
    marginVertical: 2,
  },
});

class SettingsHeader extends React.Component {
  render() {
    return (
      <View style={styles.settingsHeaderContainer}>
        <Text style={styles.settingsHeaderText}>
          {this.props.title}
        </Text>
      </View>
    );
  }
}

export default SettingsHeader;