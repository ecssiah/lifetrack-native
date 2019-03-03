import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import createStyles, { FontSize, Color } from '../../styles';

import TextEdit from '../TextEdit';
import LTModal from '../LTModal';
import LTConfirm from '../LTConfirm';

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

class CategoryEditModal extends React.Component {

  render() {
    return (
      <LTModal
        style={styles.container}
        show={this.props.show}
        onPressBackdrop={this.props.onCancel} 
      >
        <TextEdit
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