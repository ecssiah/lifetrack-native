import React from 'react';
import { Modal, TouchableHighlight, View } from 'react-native';

class LTModal extends React.Component {
  render() {
    return (
      <Modal
        transparent={true}
        visible={this.props.show} 
      >
        <TouchableHighlight 
          onPress={this.props.onPressBackdrop}
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#00000080',
          }}
        >
          <TouchableHighlight 
            activeOpacity={1}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '86%',
              height: '56%',
              padding: 20,
              borderWidth: 2,
              borderRadius: 10,
              borderColor: '#dedede',
              backgroundColor: '#ffffff',
            }}
          >
            <View 
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
              }}
            >
              {this.props.children}
            </View>
          </TouchableHighlight>
        </TouchableHighlight>
      </Modal>
    );
  };
};

export default LTModal;