import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import createStyles, { FontSize, Color } from '../../styles';

import LTText from '../LT/LTText';
import LTEdit from '../LT/LTEdit';
import LTModal from '../LT/LTModal';
import LTConfirm from '../LT/LTConfirm';

const styles = createStyles({
  container: {
    height: 212,
  },
  categoryEdit: {
    width: '92%',
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
      <View>
        <LTModal
          style={styles.container} 
          show={this.props.show}
          onPressBackdrop={this.props.onCancel} 
        >
          <LTEdit
            style={styles.categoryEdit}
            text={this.props.newCategoryName}
            onChangeText={this.props.onChangeText}
            onSubmitEditing={this.props.onSubmitEditing}
          />

          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={this.props.onDelete}
          >
            <LTText style={styles.deleteText}>
              Delete Category
            </LTText>
          </TouchableOpacity> 

          <LTConfirm
            onPressLeft={this.props.onCancel}
            onPressRight={this.props.onConfirm}
          />
        </LTModal>
      </View>
    );
  };
};

export default CategoryEditModal;