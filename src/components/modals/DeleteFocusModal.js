import React from 'react';
import { Text } from 'react-native';
import createStyles, { FontSize, Font } from '../../styles';

import LTText from '../LT/LTText';
import LTModal from '../LT/LTModal';
import LTConfirm from '../LT/LTConfirm';

const styles = createStyles({
  container: {
    height: '36%',
  },
  message: {
    fontSize: FontSize.modalTitle,
    textAlign: 'center', 
    marginTop: 12,
    marginHorizontal: 4,
  },
});

class DeleteFocusModal extends React.Component 
{
  render() {
    return (
      <LTModal
        style={styles.container}
        show={this.props.show}
        onPressBackdrop={this.props.onCancel} 
      >
        <LTText style={styles.message}>
          Are you sure you want to delete this focus?
        </LTText>
          
        <LTConfirm
          onPressLeft={this.props.onCancel} 
          onPressRight={this.props.onConfirm}
        />
      </LTModal>
    );
  };
};

export default DeleteFocusModal;