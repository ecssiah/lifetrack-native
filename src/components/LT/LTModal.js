import React from 'react'
import { Modal, TouchableHighlight, View } from 'react-native'
import createStyles from '../../styles'

const styles = createStyles({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '4%',
    paddingVertical: '24%',
    backgroundColor: '#00000080',
  },
  mask: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#aaaaaa',
    backgroundColor: 'white',
  },
})

class LTModal extends React.Component 
{
  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.show} 
      >
        <TouchableHighlight 
          style={styles.backdrop}
          onPress={this.props.onPressBackdrop}
        >
          <TouchableHighlight 
            style={[styles.mask, this.props.style]}
            activeOpacity={1}
          >
            <View style={styles.content} >
              {this.props.children}
            </View>
          </TouchableHighlight>
        </TouchableHighlight>
      </Modal>
    )
  }
}

export default LTModal