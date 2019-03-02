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
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#dddddd',
    backgroundColor: 'white',
  },
  modalContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});

class LTModal extends React.Component {
  static defaultProps = {
    width: '86%',
    height: '49%',
  };

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
            style={[styles.modalBackdropMask, this.props.style]}
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