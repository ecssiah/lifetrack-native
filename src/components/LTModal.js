import React from 'react';
import { Modal, TouchableHighlight, View } from 'react-native';
import createStyles from '../styles';

const styles = createStyles({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: '8%',
    paddingVertical: '24%',
    backgroundColor: '#00000080',
  },
  modalMask: {
    width: '100%',
    height: '100%',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#aaaaaa',
    backgroundColor: 'white',
  },
});

class LTModal extends React.Component {
  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.show} 
      >
        <TouchableHighlight 
          style={styles.modalBackdrop}
          onPress={this.props.onPressBackdrop}
        >
          <TouchableHighlight 
            style={[styles.modalMask, this.props.style]}
            activeOpacity={1}
          >
            <View style={styles.modalContent} >
              {this.props.children}
            </View>
          </TouchableHighlight>
        </TouchableHighlight>
      </Modal>
    );
  };
};

export default LTModal;