import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import createStyles, { FontSize, Color } from '../../styles';

import LTEdit from '../LT/LTEdit';
import LTModal from '../LT/LTModal';
import LTConfirm from '../LT/LTConfirm';

const styles = createStyles({
  container: {
    height: '46%',
  },
  deleteText: {
    fontSize: FontSize.modalTitle,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.highlight,
    margin: 16,
  },
});

class CategoryEditModal extends React.Component 
{
  render() {
    return (
      <LTModal
        style={styles.container}
        show={this.props.show}
        onPressBackdrop={this.props.onCancel} 
      >
        <LTEdit
          text={this.props.newCategoryName}
          onChangeText={this.props.onChangeText}
          onSubmitEditing={this.props.onSubmitEditing}
        />

        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={this.props.onDelete}
        >
          <Text style={styles.deleteText}>
            Delete
          </Text>
        </TouchableOpacity> 

        <LTConfirm
          onPressLeft={this.props.onConfirm}
          onPressRight={this.props.onCancel}
        />
      </LTModal>
    );
  };
};

export default CategoryEditModal;