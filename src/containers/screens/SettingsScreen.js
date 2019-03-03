import React from 'react';
import { connect } from 'react-redux';
import { 
  Picker, Text, TouchableOpacity, View 
} from 'react-native';
import { auth, db } from '../../config';
import firebase from 'firebase';
import { 
  WORK_PERIOD, WORK_GOAL, BREAK_PERIOD,
} from '../../constants/Focus';
import { 
  setDefaultWorkPeriod, setDefaultWorkGoal, setDefaultBreakPeriod, 
} from '../../actions/SettingsActions';
import createStyles from '../../styles'; 

import LTModal from '../../components/LTModal';
import LTConfirm from '../../components/LTConfirm';
import SettingList from '../../components/SettingList';

const styles = createStyles({
  settingsContainer: {
    flex: 1,
  },
  settingsItem: {
    fontSize: 32, 
  },
  settingsLogout: {
    fontSize: 32,
    textAlign: 'center',
    margin: 6,
  },
  settingsEditCategory: {
    fontSize: 20,
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  settingsEditModalContainer: {
    height: '50%',
    width: '86%',
  },
  settingsEditModalText: {
    fontSize: 24, 
    marginBottom: 4,
  },
  settingsEditModalPicker: {
    height: '70%',
    width: '80%',
  },
  settingsCategoryDeleteModalContainer: {
    height: '28%',
    width: '86%',
  },
  settingsCategoryDeleteModalText: {
    fontSize: 24,
    textAlign: 'center', 
    marginHorizontal: 4,
    marginBottom: 20, 
  },
});

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settingName: '',
      settingValue: '',
      categoryName: '',
      settingsEditModalShow: false,
      settingsCategoryDeleteModalShow: false,
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
      case WORK_PERIOD:
        settingValue = this.props.settings.workPeriod.toString();
        break;
      case WORK_GOAL:
        settingValue = this.props.settings.workGoal.toString();
        break;
      case BREAK_PERIOD:
        settingValue = this.props.settings.breakPeriod.toString();
        break;
      default:
        console.error('Invalid setting: ' + settingName);
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
      case WORK_PERIOD:
        this.props.setDefaultWorkPeriod(parseInt(this.state.settingValue));
        break;
      case WORK_GOAL:
        this.props.setDefaultWorkGoal(parseInt(this.state.settingValue));
        break;
      case BREAK_PERIOD:
        this.props.setDefaultBreakPeriod(parseInt(this.state.settingValue));
        break;
      default:
        console.error('invalid setting: ' + settingName);
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
      settingsCategoryDeleteModalShow: true,
    });
  };

  _onCategoryDeleteConfirm = () => {
    db.collection('categories').doc(auth.currentUser.uid).update({
      list: firebase.firestore.FieldValue.arrayRemove(this.state.categoryName),
    }).then(() => {
      // 
    }).catch(err => {
      console.error(err);
    }); 

    this.setState({
      settingsCategoryDeleteModalShow: false,
    });
  };

  _onCategoryDeleteCancel = () => {
    this.setState({
      settingsCategoryDeleteModalShow: false,
    });
  };

  _renderLogout = ({ item, index, section: { title, data } }) => {
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
  };

  _renderCategory = ({ item, index, section: { title, data } }) => {
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
  };

  _getSectionData = () => {
    let sectionData = [];

    sectionData.push({
      title: '',
      data: [
        { name: 'Logout', value: ''},
      ], 
      renderItem: this._renderLogout,
    });

    sectionData.push({
      title: 'Default',
      data: [ 
        { name: WORK_PERIOD, value: this.props.settings.workPeriod },
        { name: WORK_GOAL, value: this.props.settings.workGoal },
        { name: BREAK_PERIOD, value: this.props.settings.breakPeriod },
      ],
    });

    sectionData.push({
      title: 'Categories',
      data: this.props.categories.map(category => {
        return { name: category.name, value: '' };
      }),
      renderItem: this._renderCategory,
    });

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
          style={styles.settingsCategoryDeleteModalContainer}
          show={this.state.settingsCategoryDeleteModalShow}
          onPressBackdrop={this._onCategoryDeleteCancel} 
        >
          <Text style={styles.settingsCategoryDeleteModalText}>
            Do you want to delete {this.state.categoryName}? 
          </Text>
            
          <LTConfirm
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
  setDefaultWorkPeriod: period => dispatch(setDefaultWorkPeriod(period)),
  setDefaultWorkGoal: goal => dispatch(setDefaultWorkGoal(goal)),
  setDefaultBreakPeriod: period => dispatch(setDefaultBreakPeriod(period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);