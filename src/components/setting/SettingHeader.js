import React from 'react';
import { 
  View 
} from 'react-native';
import createStyles, { FontSize } from '../../styles'; 

import LTText from '../LT/LTText';

const styles = createStyles({
  container: {
    backgroundColor: '#666666',
    borderTopWidth: 1,
    borderTopColor: '#777777',
    borderBottomWidth: 1,
    borderBottomColor: '#555555',
  },
  title: {
    color: 'white',
    fontSize: FontSize.sectionHeader,
    marginLeft: 4,
    marginVertical: 2,
  },
});

class SettingsHeader extends React.PureComponent 
{
  render() {
    return (
      <View style={styles.container}>
        <LTText style={styles.title}>
          {this.props.title}
        </LTText>
      </View>
    );
  };
};

export default SettingsHeader;