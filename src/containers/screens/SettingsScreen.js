import React from 'react';
import { connect } from 'react-redux';
import { 
  Picker, Text, TextInput, TouchableOpacity, View 
} from 'react-native';
import { auth, db } from '../../config';
import firebase from 'firebase';
import { 
  WORK_PERIOD, WORK_GOAL, BREAK_PERIOD,
} from '../../constants/Focus';
import {
  deleteCategory,
  setCategoryName,
} from '../../actions/CategoriesActions';
import { 
  setDefaultWorkPeriod, setDefaultWorkGoal, setDefaultBreakPeriod, 
} from '../../actions/SettingsActions';
import {
  updateCategories,
} from '../../actions/FocusesActions';
import createStyles, { Color, FontSize } from '../../styles'; 

import LTModal from '../../components/LTModal';
import LTConfirm from '../../components/LTConfirm';
import SettingList from '../../components/SettingList';

const styles = createStyles({
  settingsLogout: {
    fontSize: FontSize.subtitle,
    color: Color.highlight,
    textAlign: 'center',
    margin: 6,
  },
  settingsEditCategory: {
    fontSize: FontSize.settingItem,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  settingsEditModalContainer: {
    height: '78%',
  },
  settingsEditModalText: {
    fontSize: FontSize.modalTitle, 
    marginTop: 14,
  },
  settingsEditModalPicker: {
    width: '86%',
  },
  settingsCategoryEditModalContainer: {
    height: '32%',
  },
  settingsEditCategoryNameBlur: {
    fontSize: FontSize.modalTitle, 
    borderColor: 'black',
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 0,
    margin: 8,
    paddingVertical: 9,
    paddingHorizontal: 15,
  },
  settingsEditCategoryNameFocus: {
    fontSize: FontSize.modalTitle, 
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
    margin: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  settingsCategoryDeleteModalButton: {
    fontSize: FontSize.modalTitle,
    color: Color.highlight,
    textAlign: 'center', 
    marginHorizontal: 4,
    marginBottom: 14,
  },
});

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settingName: '',
      settingValue: '',
      categoryName: '',
      newCategoryName: '',
      settingsEditModalShow: false,
      settingsCategoryDeleteModalShow: false,
      settingsEditCategoryNameStyle: styles.settingsEditCategoryNameBlur,
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

  _onSettingSelect = settingName => {
    let settingValue;

    switch (settingName) {
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
      settingsEditModalShow: true,
    });
  };

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

  _onSettingValueChange = settingValue => {
    this.setState({
      settingValue,
    });
  };

  _onSettingEditConfirm = () => {
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
      settingsEditModalShow: false,
    });
  };

  _onSettingEditCancel = () => {
    this.setState({
      settingsEditModalShow: false,
    });
  };

  _onCategorySelect = categoryName => {
    this.setState({
      categoryName,
      newCategoryName: categoryName,
      settingsCategoryDeleteModalShow: true,
    });
  };

  _onCategoryDeleteConfirm = () => {
    if (this.state.categoryName !== 'Uncategorized') {
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
    } else {
      console.warn('Uncategorized can not be deleted');
    }

    this.setState({
      settingsCategoryDeleteModalShow: false,
    });
  };

  _onCategoryDeleteCancel = () => {
    this.setState({
      settingsCategoryDeleteModalShow: false,
    });
  };

  _onEditCategoryNameConfirm = () => {
    this.props.setCategoryName(this.state.categoryName, this.state.newCategoryName);
    this.props.updateCategories(this.state.categoryName, this.state.newCategoryName);
  };

  _onEditCategoryNameBlur = () => {
    this.setState({
      settingsEditCategoryNameStyle: styles.settingsEditCategoryNameBlur,
    });
  };

  _onEditCategoryNameFocus = () => {
    this.setState({
      settingsEditCategoryNameStyle: styles.settingsEditCategoryNameFocus,
    });
  };

  _renderLogout = ({item, index}) => {
    if (item) {
      return (
        <TouchableOpacity 
          key={index} 
          onPress={this._logoutUser}
        >
          <Text style={styles.settingsLogout}>
            {item.name}
          </Text>
        </TouchableOpacity> 
      );
    } else {
      return null;
    }
  };

  _renderCategory = ({item, index}) => {
    if (item) {
      return (
        <TouchableOpacity 
          key={index} 
          onPress={() => this._onCategorySelect(item.name)}
        >
          <Text style={styles.settingsEditCategory}>
            {item.name}
          </Text>
        </TouchableOpacity> 
      );
    } else {
      return null;
    }
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
        title: 'Default',
        data: [ 
          { name: WORK_PERIOD, value: this.props.settings.workPeriod },
          { name: WORK_GOAL, value: this.props.settings.workGoal },
          { name: BREAK_PERIOD, value: this.props.settings.breakPeriod },
        ],
      },
      {
        title: 'Categories',
        data: this.props.categories.map(category => {
          return { name: category.name, value: '' };
        }),
        renderItem: this._renderCategory,
      },
    ];

    return sectionData;
  };

  render() {
    return (
      <View style={styles.container}>
        <SettingList
          sections={this._getSectionData()} 
          onSettingSelect={this._onSettingSelect}
        />

        <LTModal 
          style={styles.settingsEditModalContainer}
          show={this.state.settingsEditModalShow}
          onPressBackdrop={this._onSettingEditCancel}
        >
          <Text style={styles.settingsEditModalText}>
            {this.state.settingName}
          </Text>

          <Picker
            style={styles.settingsEditModalPicker}
            selectedValue={this.state.settingValue}
            onValueChange={value => this._onSettingValueChange(value)}
          >
            {this._getSettingRange(1, 40)}
          </Picker>

          <LTConfirm
            onPressLeft={this._onSettingEditConfirm}
            onPressRight={this._onSettingEditCancel}
          />
        </LTModal>

        <LTModal
          style={styles.settingsCategoryEditModalContainer}
          show={this.state.settingsCategoryDeleteModalShow}
          onPressBackdrop={this._onCategoryDeleteCancel} 
        >
          <TextInput
            style={this.state.settingsEditCategoryNameStyle}
            value={this.state.newCategoryName}
            placeholder='Category Name'
            textAlign='center'
            returnKeyType='done'
            keyboardAppearance='dark'
            selectionColor={Color.primary}
            onBlur={this._onEditCategoryNameBlur}
            onFocus={this._onEditCategoryNameFocus}
            onChangeText={newCategoryName => this.setState({newCategoryName})}
            onSubmitEditing={this._onEditCategoryNameConfirm}
          />

          <LTConfirm
            leftContent='Delete'
            onPressLeft={this._onCategoryDeleteConfirm}
            onPressRight={this._onCategoryDeleteCancel}
          />
        </LTModal>
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