import React from 'react'
import { Picker, TextInput } from 'react-native'
import createStyles, { FontSize, Font } from '../../styles'

import LTModal from '../LT/LTModal'
import LTSpacer from '../LT/LTSpacer'
import LTConfirm from '../LT/LTConfirm'

const styles = createStyles({
  container: {
    height: 346,
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
  },
  picker: {
    width: '72%',
  },
})

class FocusAddModal extends React.Component 
{
  _getCategoryItems = () => {
    const categoryNames = Object.keys(this.props.categories)

    const categoryItems = categoryNames.map((categoryName, idx) => 
      <Picker.Item 
        key={idx} 
        label={categoryName} 
        value={categoryName}
      />
    )

    return categoryItems
  }

  render() {
    return (
      <LTModal
        style={styles.container}
        show={this.props.show} 
        onPressBackdrop={this.props.onCancel}
      >
        <LTSpacer medium />

        <TextInput
          style={styles.nameInput}
          value={this.props.focusName}
          placeholder={'New Focus'}
          textAlign='center'
          maxLength={24}
          returnKeyType='done'
          keyboardAppearance='dark'
          onChangeText={this.props.onFocusNameChange}
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
          onPressLeft={this.props.onCancel}
          onPressRight={this.props.onConfirm}
        />
      </LTModal>
    )
  }
}

export default FocusAddModal