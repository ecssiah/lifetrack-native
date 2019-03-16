import React from 'react';
import { connect } from 'react-redux';
import { 
  Alert, TouchableOpacity, View 
} from 'react-native';
import firebase from '../../../config/fbConfig';
import {
  addCategory,
  deleteCategory,
  setCategoryName,
} from '../../../actions/CategoriesActions';
import {
  updateCategories,
} from '../../../actions/FocusesActions';
import createStyles, { FontSize } from '../../../styles'; 

import LTIcon from '../../../components/LT/LTIcon';
import LTText from '../../../components/LT/LTText';
import CategoryAddModal from '../../../components/modals/CategoryAddModal';
import CategoryEditModal from '../../../components/modals/CategoryEditModal';
import CategoryList from '../../../components/setting/CategoryList';

const styles = createStyles({
  categoryName: {
    fontSize: FontSize.settingItem,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },
});

class CategoriesScreen extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      categoryName: '',
      newCategoryName: '',
      addModalShow: false,
      categoryModalShow: false,
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
        onPress={() => navigation.state.params.addModalToggle()}
      />
    ),
  });

  componentDidMount() {
    this.props.navigation.setParams({
      addModalToggle: this._onAddModalToggle,
    });
  };

  _onAddModalToggle = () => {
    this.setState({
      addModalShow: !this.state.addModalShow,
    });
  };

  _onCategoryAddConfirm = () => {
    const category = {
      name: this.state.newCategoryName,
      show: true,
    };

    firebase.firestore().collection('categories').doc(firebase.auth().currentUser.uid).update({
      list: firebase.firestore.FieldValue.arrayUnion(category),
    }).then(() => {
      this.props.addCategory(category);

      this.setState({
        newCategoryName: '',
      });
    }).catch(error => {
      console.error(error);
    });

    this.setState({
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
      categoryModalShow: true,
    });
  };

  _updateDatabaseCategories = category => {
    let query;
    query = firebase.firestore().collection('focuses');
    query = query.where('userId', '==', firebase.auth().currentUser.uid);
    query = query.where('category', '==', category.name);

    query.get().then(snapshot => {
      let batch = firebase.firestore().batch();
      snapshot.forEach(focus => {
        const focusRef = firebase.firestore().collection('focuses').doc(focus.id);
        batch.update(focusRef, { category: 'Uncategorized' });
      });

      batch.commit();
    });
  };

  _handleCategoryDelete = () => {
    const category = this.props.categories.find(category => 
      category.name === this.state.categoryName
    );

    firebase.firestore().collection('categories').doc(firebase.auth().currentUser.uid).update({
      list: firebase.firestore.FieldValue.arrayRemove(category),
    }).then(() => {
      this._updateDatabaseCategories(category);
      
      this.props.deleteCategory(category);
      this.props.updateCategories(category, 'Uncategorized');
    }).catch(error => {
      console.error(error);
    }); 

    this.setState({
      categoryModalShow: false,
    });
  };

  _onCategoryDelete = () => {
    Alert.alert(
      'Are you sure you want to delete ' + this.state.categoryName + '?',
      '',
      [
        { text: 'Cancel', onPress: null, },
        { text: 'Confirm', onPress: this._handleCategoryDelete, },
      ],
    );
  };

  _onCategoryConfirm = () => {
    this.setState({
      categoryModalShow: false,
    });
  };

  _onCategoryCancel = () => {
    this.setState({
      categoryModalShow: false,
    });
  };

  _onCategoryNameEditConfirm = () => {
    if (this.state.categoryName === this.state.newCategoryName) {
      return;
    }

    const category = this.props.categories.find(category => 
      category.name === this.state.newCategoryName
    );

    if (category) {
      Alert.alert(
        this.state.newCategoryName + ' already exists.',
        '',
        [
          {text: 'Confirm', onPress: null},
        ],
      );

      this.setState({
        newCategoryName: this.state.categoryName,
      });
    } else {
      this.props.setCategoryName(
        this.state.categoryName, this.state.newCategoryName
      );
      this.props.updateCategories(
        this.state.categoryName, this.state.newCategoryName
      );
    }
  };

  _onCategoryNameEditBlur = () => {
    this.setState({
      categoryModalNameStyle: styles.categoryModalNameBlur,
    });
  };

  _onCategoryNameEditFocus = () => {
    this.setState({
      categoryModalNameStyle: styles.categoryModalNameFocus,
    });
  };

  _renderCategory = ({item, index}) => {
    if (!item) return null;

    return (
      <TouchableOpacity 
        key={index} 
        onPress={() => this._onCategorySelect(item.name)}
      >
        <LTText style={styles.categoryName}>
          {item.name}
        </LTText>
      </TouchableOpacity> 
    );
  };

  _getItemData = () => {
    const data = this.props.categories.filter(category => {
      return category.name !== 'Uncategorized';
    }).sort((categoryA, categoryB) => {
      return categoryA.name.localeCompare(categoryB.name);
    }).map(category => {
      return { name: category.name, value: '' };
    });

    return data;
  };

  render() {
    return (
      <View style={styles.container}>
        <CategoryList
          categoryData={this._getItemData()} 
          onCategorySelect={this._onCategorySelect}
        />

        <CategoryAddModal
          show={this.state.addModalShow}
          onConfirm={this._onCategoryAddConfirm}
          onChangeText={text => this.setState({newCategoryName: text})}
          onCancel={this._onCategoryAddCancel}
        />
        
        <CategoryEditModal
          show={this.state.categoryModalShow} 
          newCategoryName={this.state.newCategoryName}
          onDelete={this._onCategoryDelete}
          onConfirm={this._onCategoryConfirm}
          onCancel={this._onCategoryCancel}
          onChangeText={text => this.setState({newCategoryName: text})}
          onSubmitEditing={this._onCategoryNameEditConfirm}
        />
      </View>
    );
  };
};

const mapStateToProps = state => ({
  focus: state.focus,
  focuses: state.focuses,
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  addCategory: name => dispatch(addCategory(name)),
  deleteCategory: name => dispatch(deleteCategory(name)),
  setCategoryName: (name, newName) => dispatch(setCategoryName(name, newName)),
  updateCategories: (name, newName) => dispatch(updateCategories(name, newName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);