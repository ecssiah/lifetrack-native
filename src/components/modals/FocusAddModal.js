import React from 'react';
import { Picker, Text, TextInput, TouchableOpacity } from 'react-native';
import createStyles, { FontSize, Color, Font } from '../../styles';

import LTModal from '../LT/LTModal';
import LTConfirm from '../LT/LTConfirm';

const styles = createStyles({
  container: {
    height: '94%',
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
  categoryInput: {
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
    marginBottom: 4,
  },
  picker: {
    width: '86%',
  },
});

class FocusAddModal extends React.Component 
{
  _getCategoryItems = () => {
    const categoryItems = this.props.categories.map((category, idx) => 
      <Picker.Item 
        key={idx} 
        label={category.name} 
        value={category.name}
      />
    );

    return categoryItems;
  };

  render() {
    return (
      <LTModal
        style={styles.container}
        show={this.props.show} 
        onPressBackdrop={this.props.onCancel}
      >
        <TextInput
          style={styles.nameInput}
          value={this.props.newFocusName}
          placeholder={'New Focus'}
          textAlign='center'
          maxLength={24}
          returnKeyType='done'
          keyboardAppearance='dark'
          onChangeText={this.props.onFocusNameChange}
        />

        <TextInput
          style={styles.categoryInput}
          value={this.props.newCategoryName}
          placeholder={'New Category'}
          textAlign='center'
          maxLength={24}
          returnKeyType='done'
          keyboardAppearance='dark'
          onChangeText={this.props.onNewCategoryNameChange}
        />

        <Picker
          style={styles.picker}
          itemStyle={{ fontFamily: Font.primary }}
          selectedValue={this.props.categoryName}
          onValueChange={this.props.onCategoryValueChange}
        >
          {this._getCategoryItems()}
        </Picker>

        <LTConfirm
          onPressLeft={this.props.onConfirm}
          onPressRight={this.props.onCancel}
        />
      </LTModal>
    );
  };
};

export default FocusAddModal;