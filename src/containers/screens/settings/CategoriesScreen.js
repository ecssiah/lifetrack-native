import React from 'react';
import { connect } from 'react-redux';
import { 
  Alert, View 
} from 'react-native';
import { 
  addCategory, 
  deleteCategory, 
  updateCategoryName,
} from '../../../handlers/CategoryHandlers';
import createStyles from '../../../styles'; 

import LTIcon from '../../../components/LT/LTIcon';
import CategoryAddModal from '../../../components/modals/CategoryAddModal';
import CategoryEditModal from '../../../components/modals/CategoryEditModal';
import CategoryList from '../../../components/setting/CategoryList';

const styles = createStyles({ });

class CategoriesScreen extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      categoryName: '',
      newCategoryName: '',
      addModalShow: false,
      editModalShow: false,
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Categories',
    headerLeft: (
      <LTIcon
        type='ios-arrow-back'
        size={32}
        onPress={() => navigation.goBack()}
      />
    ),
    headerRight: (
      <LTIcon
        type='ios-add'
        size={42}
        onPress={() => navigation.getParam('addCategorySelect')()}
      />
    ),
  });

  componentDidMount() {
    this.props.navigation.setParams({
      addCategorySelect: this._onAddCategorySelect,
    });
  };

  _onAddCategorySelect = () => {
    this.setState({
      addModalShow: true,
    });
  };

  _onCategoryAddConfirm = () => {
    this.props.addCategory(this.state.newCategoryName);

    this.setState({
      newCategoryName: '',
      addModalShow: false,
    });
  };

  _onCategoryAddCancel = () => {
    this.setState({
      addModalShow: false,
    });
  };

  _onCategorySelect = categoryName => {
    this.setState({
      categoryName,
      newCategoryName: categoryName,
      editModalShow: true,
    });
  };

  _onCategoryDeleteConfirm = () => {
    this.props.deleteCategory(this.state.categoryName);

    this.setState({
      editModalShow: false,
    });
  };

  _onCategoryDelete = () => {
    Alert.alert(
      'Are you sure you want to delete ' + this.state.categoryName + '?',
      '',
      [
        { text: 'Cancel', onPress: null },
        { text: 'Confirm', onPress: this._onCategoryDeleteConfirm },
      ],
    );
  };

  _onCategoryConfirm = () => {
    this.setState({
      editModalShow: false,
    });
  };

  _onCategoryCancel = () => {
    this.setState({
      editModalShow: false,
    });
  };

  _onCategoryNameEditConfirm = () => {
    if (this.state.categoryName === this.state.newCategoryName) {
      return;
    }

    if (this.props.categories.hasOwnProperty(this.state.newCategoryName)) {
      Alert.alert(
        this.state.newCategoryName + ' already exists.',
        '',
        [
          { text: 'Confirm', onPress: null },
        ],
      );

      this.setState({ 
        newCategoryName: this.state.categoryName 
      });
    } else {
      this.props.updateCategoryName(
        this.state.categoryName, 
        this.state.newCategoryName, 
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <CategoryList
          categories={this.props.categories}
          onCategorySelect={this._onCategorySelect}
        />

        <CategoryAddModal
          show={this.state.addModalShow}
          onConfirm={this._onCategoryAddConfirm}
          onChangeText={text => this.setState({ newCategoryName: text })}
          onCancel={this._onCategoryAddCancel}
        />
        
        <CategoryEditModal
          show={this.state.editModalShow} 
          newCategoryName={this.state.newCategoryName}
          onDelete={this._onCategoryDelete}
          onConfirm={this._onCategoryConfirm}
          onCancel={this._onCategoryCancel}
          onChangeText={text => this.setState({ newCategoryName: text })}
          onSubmitEditing={this._onCategoryNameEditConfirm}
        />
      </View>
    );
  };
};

const mapStateToProps = state => ({
  selection: state.selection,
  focuses: state.focuses,
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  addCategory: name => addCategory(dispatch, name),
  deleteCategory: name => deleteCategory(dispatch, name),
  updateCategoryName: (name, newName) => {
    return updateCategoryName(dispatch, name, newName)
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);