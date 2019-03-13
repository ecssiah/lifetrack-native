import React from 'react';
import { connect } from 'react-redux';
import { 
  Alert, Picker, Text, TouchableOpacity, View 
} from 'react-native';
import { auth, db } from '../../../config';
import firebase from 'firebase';
import { 
  WORK_PERIOD, WORK_GOAL, BREAK_PERIOD,
} from '../../../constants/Focus';
import {
  deleteCategory,
  setCategoryName,
} from '../../../actions/CategoriesActions';
import { 
  setDefaultWorkPeriod, setDefaultWorkGoal, setDefaultBreakPeriod, 
} from '../../../actions/SettingsActions';
import {
  updateCategories,
} from '../../../actions/FocusesActions';
import createStyles, { Color, FontSize } from '../../../styles'; 

import LTText from '../../../components/LT/LTText';
import SettingList from '../../../components/setting/SettingList';
import SettingsModal from '../../../components/modals/SettingsModal';
import CategoryEditModal from '../../../components/modals/CategoryEditModal';

const styles = createStyles({
  logout: {
    fontSize: FontSize.subtitle,
    color: Color.highlight,
    textAlign: 'center',
    margin: 6,
  },
  categoryName: {
    fontSize: FontSize.settingItem,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },
});

class SettingsScreen extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      settingName: '',
      settingValue: '',
      categoryName: '',
      newCategoryName: '',
      settingsModalShow: false,
      categoryModalShow: false,
    };
  };

  static navigationOptions = {
    title: 'Settings',
  };

  _logoutUser = () => {
    for (const key in this.props.focuses) {
      clearInterval(this.props.focuses[key]);
    }

    auth.signOut().then(() => {
      this.props.navigation.navigate('Login');
    });
  };

  _onSettingValueChange = settingValue => {
    this.setState({
      settingValue,
    });
  };

  _onSettingSelect = settingName => {
    let settingValue;

    switch (settingName) {
      case 'Categories': {
        this.props.navigation.navigate('Categories');
        return;
      }
      case WORK_PERIOD: {
        settingValue = this.props.settings.workPeriod.toString();
        break;
      }
      case WORK_GOAL: {
        settingValue = this.props.settings.workGoal.toString();
        break;
      }
      case BREAK_PERIOD: {
        settingValue = this.props.settings.breakPeriod.toString();
        break;
      }
      default: {
        console.error('Invalid setting: ' + settingName);
      }
    }

    this.setState({
      settingName,
      settingValue,
      settingsModalShow: true,
    });
  };

  _onSettingConfirm = () => {
    switch (this.state.settingName) {
      case WORK_PERIOD: {
        this.props.setDefaultWorkPeriod(parseInt(this.state.settingValue));
        break;
      }
      case WORK_GOAL: {
        this.props.setDefaultWorkGoal(parseInt(this.state.settingValue));
        break;
      }
      case BREAK_PERIOD: {
        this.props.setDefaultBreakPeriod(parseInt(this.state.settingValue));
        break;
      }
      default: {
        console.error('invalid setting: ' + settingName);
      }
    }

    this.setState({
      settingsModalShow: false,
    });
  };

  _onSettingCancel = () => {
    this.setState({
      settingsModalShow: false,
    });
  };

  _onCategorySelect = categoryName => {
    this.setState({
      categoryName,
      newCategoryName: categoryName,
      categoryModalShow: true,
    });
  };

  _handleCategoryDelete = () => {
    const category = this.props.categories.find(category => 
      category.name === this.state.categoryName
    );

    db.collection('categories').doc(auth.currentUser.uid).update({
      list: firebase.firestore.FieldValue.arrayRemove(category),
    }).then(() => {
      this.props.deleteCategory(this.state.categoryName);
      this.props.updateCategories(this.state.categoryName, 'Uncategorized');

      // Update focus categories in firestore
    }).catch(err => {
      console.error(err);
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
        {
          text: 'Cancel',
          onPress: null,
        },
        {
          text: 'Confirm', 
          onPress: this._handleCategoryDelete,
        },
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

  _renderLogout = ({item, index}) => {
    if (!item) return null;

    return (
      <TouchableOpacity 
        key={index} 
        onPress={this._logoutUser}
      >
        <LTText style={styles.logout}>
          {item.name}
        </LTText>
      </TouchableOpacity> 
    );
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

  _getSectionData = () => {
    const sectionData = [
      {
        title: '',
        data: [
          { name: 'Logout', value: ''},
        ], 
        renderItem: this._renderLogout,
      },
      {
        title: 'General',
        data: [ 
          { name: WORK_PERIOD, value: this.props.settings.workPeriod },
          { name: WORK_GOAL, value: this.props.settings.workGoal },
          { name: BREAK_PERIOD, value: this.props.settings.breakPeriod },
          { name: 'Categories', value: '⇨'},
        ],
      },
    ];

    return sectionData;
  };

  render() {
    return (
      <View style={styles.container}>
        <SettingList
          sectionData={this._getSectionData()} 
          onSettingSelect={this._onSettingSelect}
        />
        
        <SettingsModal
          show={this.state.settingsModalShow}
          settingName={this.state.settingName}
          settingValue={this.state.settingValue}
          onConfirm={this._onSettingConfirm} 
          onCancel={this._onSettingCancel}
          onSettingValueChange={value => this._onSettingValueChange(value)}
        />
      </View>
    );
  };
};

const mapStateToProps = state => ({
  focus: state.focus,
  focuses: state.focuses,
  categories: state.categories,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  deleteCategory: name => dispatch(deleteCategory(name)),
  setCategoryName: (name, newName) => dispatch(setCategoryName(name, newName)),
  updateCategories: (name, newName) => dispatch(updateCategories(name, newName)),
  setDefaultWorkPeriod: period => dispatch(setDefaultWorkPeriod(period)),
  setDefaultWorkGoal: goal => dispatch(setDefaultWorkGoal(goal)),
  setDefaultBreakPeriod: period => dispatch(setDefaultBreakPeriod(period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);