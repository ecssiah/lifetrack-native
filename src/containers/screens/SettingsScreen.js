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
  settingsModalContainer: {
    height: '78%',
  },
  settingsModalText: {
    fontSize: FontSize.modalTitle, 
    marginTop: 14,
  },
  settingsModalPicker: {
    width: '86%',
  },
  categoryModalContainer: {
    height: '32%',
  },
  categoryModalNameBlur: {
    fontSize: FontSize.modalTitle, 
    borderColor: 'black',
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 0,
    margin: 8,
    paddingVertical: 9,
    paddingHorizontal: 15,
  },
  categoryModalNameFocus: {
    fontSize: FontSize.modalTitle, 
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
    margin: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
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
      categoryModalNameStyle: styles.categoryModalNameBlur,
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

  _onSettingChange = settingValue => {
    this.setState({
      settingValue,
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

  _onCategorySelect = categoryName => {
    this.setState({
      categoryName,
      newCategoryName: categoryName,
      categoryModalShow: true,
    });
  };

  _onCategoryDeleteConfirm = () => {
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

  _onCategoryDeleteCancel = () => {
    this.setState({
      categoryModalShow: false,
    });
  };

  _onCategoryNameEditConfirm = () => {
    this.props.setCategoryName(
      this.state.categoryName, this.state.newCategoryName
    );
    this.props.updateCategories(
      this.state.categoryName, this.state.newCategoryName
    );
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
        <Text style={styles.logout}>
          {item.name}
        </Text>
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
        <Text style={styles.categoryName}>
          {item.name}
        </Text>
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
        title: 'Default',
        data: [ 
          { name: WORK_PERIOD, value: this.props.settings.workPeriod },
          { name: WORK_GOAL, value: this.props.settings.workGoal },
          { name: BREAK_PERIOD, value: this.props.settings.breakPeriod },
        ],
      },
      {
        title: 'Categories',
        data: this.props.categories.filter(category => {
          return category.name !== 'Uncategorized';
        }).map(category => {
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
          style={styles.settingsModalContainer}
          show={this.state.settingsModalShow}
          onPressBackdrop={this._onSettingCancel}
        >
          <Text style={styles.settingsModalText}>
            {this.state.settingName}
          </Text>

          <Picker
            style={styles.settingsModalPicker}
            selectedValue={this.state.settingValue}
            onValueChange={value => this._onSettingChange(value)}
          >
            {this._getSettingRange(1, 40)}
          </Picker>

          <LTConfirm
            onPressLeft={this._onSettingConfirm}
            onPressRight={this._onSettingCancel}
          />
        </LTModal>

        <LTModal
          style={styles.categoryModalContainer}
          show={this.state.categoryModalShow}
          onPressBackdrop={this._onCategoryDeleteCancel} 
        >
          <TextInput
            style={this.state.categoryModalNameStyle}
            value={this.state.newCategoryName}
            placeholder='Category Name'
            textAlign='center'
            returnKeyType='done'
            keyboardAppearance='dark'
            selectionColor={Color.primary}
            onBlur={this._onCategoryNameEditBlur}
            onFocus={this._onCategoryNameEditFocus}
            onChangeText={newCategoryName => this.setState({newCategoryName})}
            onSubmitEditing={this._onCategoryNameEditConfirm}
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