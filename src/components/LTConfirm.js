import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import createStyles, { Color } from '../styles';

const styles = createStyles({
  ltconfirmContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ltconfirmViewLeft: {
    flex: 1,
    bottom: 0,
    borderColor: '#dddddd', 
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  ltconfirmViewRight: {
    flex: 1,
    bottom: 0,
    borderColor: '#dddddd', 
    borderTopWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 1,
    borderBottomWidth: 0,
  },
  ltconfirmTextLeft: {
    color: Color.working,
    fontSize: 18, 
    paddingVertical: '10%',
    textAlign: 'center',
  },
  ltconfirmTextRight: {
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
      <View style={styles.ltconfirmContainer}>
        <TouchableOpacity 
          style={styles.ltconfirmViewLeft} 
          onPress={this.props.onPressLeft} 
        >
          <Text style={styles.ltconfirmTextLeft} >
            {this.props.leftContent}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.ltconfirmViewRight} 
          onPress={this.props.onPressRight} 
        >
          <Text style={styles.ltconfirmTextRight} >
            {this.props.rightContent}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
};

export default LTConfirm;