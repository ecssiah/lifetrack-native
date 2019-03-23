import React from 'react';
import { connect } from 'react-redux';
import { 
  Alert, TouchableOpacity, View 
} from 'react-native';
import { 
  addCategory, 
  deleteCategory, 
  updateCategoryName,
} from '../../../handlers/CategoryHandlers';
import { UNCATEGORIZED } from '../../../constants/Categories';
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
      categoryModalShow: true,
    });
  };

  _onCategoryDeleteConfirm = () => {
    this.props.deleteCategory(this.state.categoryName);

    this.setState({
      categoryModalShow: false,
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

    if (this.props.categories.hasOwnProperty(this.state.newCategoryName)) {
      Alert.alert(
        this.state.newCategoryName + ' already exists.',
        '',
        [
          { text: 'Confirm', onPress: null },
        ],
      );

      this.setState({
        newCategoryName: this.state.categoryName,
      });
    } else {
      this.props.updateCategoryName(
        this.state.categoryName, 
        this.state.newCategoryName, 
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
    const categoryNames = Object.keys(this.props.categories);

    const data = categoryNames.filter(categoryName => {
      return categoryName !== UNCATEGORIZED;
    }).sort((a, b) => {
      return a.localeCompare(b);
    }).map(categoryName => {
      return { name: categoryName, value: '' };
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