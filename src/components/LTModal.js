import React from 'react';
import { Modal, TouchableHighlight, View } from 'react-native';
import createStyles from '../styles';

const styles = createStyles({
  modalBackdrop: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  modalBackdropMask: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#dedede',
    backgroundColor: '#ffffff',
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
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
          onPress={this.props.onPressBackdrop}
          style={styles.modalBackdrop}
        >
          <TouchableHighlight 
            activeOpacity={1}
            style={this.props.style}
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

LTModal.defaultProps = {
  width: '86%',
  height: '49%',
};

export default LTModal;