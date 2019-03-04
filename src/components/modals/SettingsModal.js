import React from 'react';
import { Picker, Text } from 'react-native';
import createStyles, { FontSize } from '../../styles';

import LTModal from '../LT/LTModal';
import LTConfirm from '../LT/LTConfirm';

const styles = createStyles({
  container: {
    height: '78%',
  },
  title: {
    fontSize: FontSize.modalTitle,
    marginTop: 14,
  },
  picker: {
    width: '86%',
  },
});

class SettingsModal extends React.Component 
{
  _getSettingRange = (start, end) => {
    return (
      Array(start + end  - 1).fill().map((_, i) => 
        <Picker.Item 
          key={i} 
          label={(i + start).toString()} 
          value={(i + start).toString()} 
        />
      )
    );
  };

  render() {
    return (
      <LTModal
        style={styles.container}
        show={this.props.show}
        onPressBackdrop={this.props.onCancel}
      >
        <Text style={styles.title}>
          {this.props.settingName}
        </Text>

        <Picker
          selectedValue={this.props.settingValue}
          onValueChange={this.props.onSettingValueChange}
          style={styles.picker}
        >
          {this._getSettingRange(1, 40)}
        </Picker>

        <LTConfirm
          onPressLeft={this.props.onConfirm} 
          onPressRight={this.props.onCancel}
        />
      </LTModal>
    );
  };
};

export default SettingsModal;