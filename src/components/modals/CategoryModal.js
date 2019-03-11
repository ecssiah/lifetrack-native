import React from 'react';
import { Picker, TextInput } from 'react-native';
import createStyles, { FontSize, Font } from '../../styles';

import LTModal from '../LT/LTModal';
import LTConfirm from '../LT/LTConfirm';

const styles = createStyles({
  container: {
    height: '80%',
  },
  input: {
    width: '86%',
    height: 40, 
    fontSize: FontSize.modalInput,
    fontFamily: Font.primary,
    marginTop: 14,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray', 
  },
  picker: {
    width: '86%',
  },
});

class CategoryModal extends React.Component 
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
          style={styles.input}
          value={this.props.newCategoryName}
          placeholder={'New Category'}
          maxLength={24}
          textAlign='center'
          returnKeyType='done'
          keyboardAppearance='dark'
          onChangeText={this.props.onCategoryTextChange}
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

export default CategoryModal;