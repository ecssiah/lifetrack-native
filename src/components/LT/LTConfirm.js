import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import createStyles, { Color } from '../../styles'

import LTText from '../LT/LTText'

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
    color: Color.highlight,
    fontSize: 18, 
    paddingVertical: '10%',
    textAlign: 'center',
  },
  textRight: {
    color: Color.working,
    fontSize: 18, 
    paddingVertical: '10%',
    textAlign: 'center',
  },
})

class LTConfirm extends React.Component 
{
  static defaultProps = {
    leftContent: 'Cancel',
    rightContent: 'Confirm',
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity 
          style={styles.viewLeft} 
          activeOpacity={0.7}
          onPress={this.props.onPressLeft} 
        >
          <LTText style={styles.textLeft} >
            {this.props.leftContent}
          </LTText>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.viewRight} 
          activeOpacity={0.7}
          onPress={this.props.onPressRight} 
        >
          <LTText style={styles.textRight} >
            {this.props.rightContent}
          </LTText>
        </TouchableOpacity>
      </View>
    )
  }
}


export default LTConfirm