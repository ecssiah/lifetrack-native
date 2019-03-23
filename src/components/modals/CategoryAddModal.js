import React from 'react';
import { TextInput } from 'react-native';
import createStyles, { FontSize, Color, Font } from '../../styles';

import LTModal from '../LT/LTModal';
import LTConfirm from '../LT/LTConfirm';

const styles = createStyles({
  container: {
    height: '100%',
  },
  nameInput: {
    width: '86%',
    height: 40, 
    fontSize: FontSize.modalInput, 
    fontFamily: Font.primary,
    color: 'black',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingVertical: 9,
    paddingHorizontal: 10,
    marginTop: 14,
  },
});

class CategoryAddModal extends React.Component 
{
  render() {
    return (
      <LTModal
        style={styles.container}
        show={this.props.show} 
        onPressBackdrop={this.props.onCancel}
      >
        <TextInput
          style={styles.nameInput}
          value={this.props.newCategoryName}
          placeholder={'New Category'}
          textAlign='center'
          maxLength={24}
          returnKeyType='done'
          keyboardAppearance='dark'
          onChangeText={this.props.onChangeText}
        />

        <LTConfirm
          onPressLeft={this.props.onCancel}
          onPressRight={this.props.onConfirm}
        />
      </LTModal>
    );
  };
};

export default CategoryAddModal;