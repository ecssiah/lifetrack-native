import React from 'react';
import { connect } from 'react-redux';
import { 
  Alert, TouchableOpacity, View 
} from 'react-native';
import { 
  WORK_PERIOD, WORK_GOAL, BREAK_PERIOD,
} from '../../../constants/Focus';
import { signOutHandler } from '../../../handlers/AuthHandlers';
import { updateSettingsHandler } from '../../../handlers/SettingsHandlers';
import createStyles, { Color, FontSize } from '../../../styles'; 

import LTText from '../../../components/LT/LTText';
import SettingList from '../../../components/setting/SettingList';
import SettingsModal from '../../../components/modals/SettingsModal';

const styles = createStyles({
  logout: {
    fontSize: FontSize.subtitle,
    color: Color.highlight,
    textAlign: 'center',
    margin: 6,
  },
});

class SettingsScreen extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      settingName: '',
      settingValue: '',
      settingsModalShow: false,
    };
  };

  static navigationOptions = {
    title: 'Settings',
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
    const settings = {...this.props.settings};

    switch (this.state.settingName) {
      case WORK_PERIOD: {
        settings.workPeriod = parseInt(this.state.settingValue);
        break;
      }
      case WORK_GOAL: {
        settings.workGoal = parseInt(this.state.workGoal);
        break;
      }
      case BREAK_PERIOD: {
        settings.breakPeriod = parseInt(this.state.settingValue);
        break;
      }
      default: {
        console.error('invalid setting: ' + settingName);
      }
    }

    this.props.updateSettings(settings);

    this.setState({
      settingsModalShow: false,
    });
  };

  _onSettingCancel = () => {
    this.setState({
      settingsModalShow: false,
    });
  };

  _onLogout = () => {
    Alert.alert(
      'Do you want to logout?',
      '',
      [
        { text: 'Cancel', onPress: null },
        { text: 'Confirm', onPress: this._handleLogout },
      ],
    );
  };

  _handleLogout = () => {
    for (const key in this.props.focuses) {
      clearInterval(this.props.focuses[key]);
    }

    this.props.signOut();
  };

  _renderLogout = ({item, index}) => {
    if (!item) return null;

    return (
      <TouchableOpacity 
        key={index} 
        onPress={this._onLogout}
      >
        <LTText style={styles.logout}>
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
        ],
      },
      {
        title: '',
        data: [
          { name: 'Categories', value: '>'},
        ],
      },
      {
        title: '',
        data: [ ],
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
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  signOut: () => signOutHandler(dispatch),
  updateSettings: settings => updateSettingsHandler(dispatch, settings),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);