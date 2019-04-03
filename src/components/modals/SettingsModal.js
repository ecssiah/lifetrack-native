import React from 'react'
import { Picker } from 'react-native'
import createStyles, { FontSize, Font } from '../../styles'

import LTText from '../LT/LTText'
import LTModal from '../LT/LTModal'
import LTSpacer from '../LT/LTSpacer'
import LTConfirm from '../LT/LTConfirm'

const styles = createStyles({
  container: {
    height: 332,
  },
  title: {
    fontSize: FontSize.modalTitle,
  },
  picker: {
    width: '86%',
  },
})

class SettingsModal extends React.Component 
{
  _getSettingItems = (start, end) => {
    const settingArray = Array(start + end  - 1).fill()

    const settingItems = settingArray.map((_, i) => 
      <Picker.Item 
        key={i} 
        label={(i + start).toString()} 
        value={(i + start).toString()} 
      />
    )

    return settingItems
  }

  render() {
    return (
      <LTModal
        style={styles.container}
        show={this.props.show}
        onPressBackdrop={this.props.onCancel}
      >
        <LTSpacer large />

        <LTText style={styles.title}>
          {this.props.settingName}
        </LTText>

        <Picker
          style={styles.picker}
          itemStyle={{ fontFamily: Font.primary }}
          selectedValue={this.props.settingValue}
          onValueChange={this.props.onSettingValueChange}
        >
          {this._getSettingItems(1, 40)}
        </Picker>

        <LTConfirm
          onPressLeft={this.props.onCancel} 
          onPressRight={this.props.onConfirm}
        />
      </LTModal>
    )
  }
}

export default SettingsModal