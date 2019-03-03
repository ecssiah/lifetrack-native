import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import createStyles, { Color } from '../styles';

const styles = createStyles({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewLeft: {
    flex: 1,
    bottom: 0,
    borderColor: '#dddddd', 
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  viewRight: {
    flex: 1,
    bottom: 0,
    borderColor: '#dddddd', 
    borderTopWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 1,
    borderBottomWidth: 0,
  },
  textLeft: {
    color: Color.working,
    fontSize: 18, 
    paddingVertical: '10%',
    textAlign: 'center',
  },
  textRight: {
    color: Color.highlight,
    fontSize: 18, 
    paddingVertical: '10%',
    textAlign: 'center',
  },
});

class LTConfirm extends React.Component {
  static defaultProps = {
    leftContent: 'Confirm',
    rightContent: 'Cancel',
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.viewLeft} 
          activeOpacity={0.7}
          onPress={this.props.onPressLeft} 
        >
          <Text style={styles.textLeft} >
            {this.props.leftContent}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.viewRight} 
          activeOpacity={0.7}
          onPress={this.props.onPressRight} 
        >
          <Text style={styles.textRight} >
            {this.props.rightContent}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
};

export default LTConfirm;