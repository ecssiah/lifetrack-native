import React from 'react';
import { Picker, TextInput } from 'react-native';
import createStyles, { FontSize, Font } from '../../styles';

import LTModal from '../LT/LTModal';
import LTConfirm from '../LT/LTConfirm';

const styles = createStyles({
  container: {
    height: '66%',
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
    const categories = Object.keys(this.props.categories);

    const categoryItems = categories.map((categoryName, idx) => 
      <Picker.Item 
        key={idx} 
        label={categoryName} 
        value={categoryName}
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
        <Picker
          style={styles.picker}
          itemStyle={{ fontFamily: Font.primary }}
          selectedValue={this.props.categoryName}
          onValueChange={this.props.onCategoryValueChange}
        >
          {this._getCategoryItems()}
        </Picker>

        <LTConfirm
          onPressLeft={this.props.onCancel} 
          onPressRight={this.props.onConfirm}
        />
      </LTModal>
    );
  };
};

export default CategoryModal;