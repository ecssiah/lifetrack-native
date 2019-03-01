import React from 'react';
import { connect } from 'react-redux';
import { 
  Button, Picker, Text, TouchableOpacity, TouchableHighlight, View 
} from 'react-native';
import { auth } from '../../config';
import { 
  WORK_PERIOD, WORK_GOAL, BREAK_PERIOD,
} from '../../constants/Focus';
import { 
  setDefaultWorkPeriod, setDefaultWorkGoal, setDefaultBreakPeriod, 
} from '../../actions/SettingsActions';
import createStyles, { Colors } from '../../styles'; 

import LTModal from '../../components/LTModal';
import SettingList from '../../components/SettingList';

const styles = createStyles({
  settingsContainer: {
    flex: 1,
  },
  settingsModalContainer: {
    height: '50%',
    width: '86%',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  settingsLogout: {
    fontSize: 28,
    textAlign: 'center',
    margin: 6,
  },
  settingsItem: {
    fontSize: 32, 
  },
  settingsModalText: {
    fontSize: 24, 
    marginBottom: 4,
  },
  settingsModalPicker: {
    height: '70%',
    width: '80%',
    marginBottom: -32,
  },
});

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      setting: null,
      value: null,
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

  _selectSetting = setting => {
    let value;

    switch (setting) {
      case 'Logout':
        this._logoutUser();
        return;
      case WORK_PERIOD:
        value = this.props.settings.workPeriod.toString();
        break;
      case WORK_GOAL:
        value = this.props.settings.workGoal.toString();
        break;
      case BREAK_PERIOD:
        value = this.props.settings.breakPeriod.toString();
        break;
      default:
        console.error('Invalid setting: ' + setting);
    }

    this.setState({
      modalShow: true,
      setting,
      value,
    });
  };

  _onValueChange = value => {
    this.setState({
      value,
    });
  };

  _onConfirm = () => {
    switch (this.state.setting) {
      case WORK_PERIOD:
        this.props.setDefaultWorkPeriod(parseInt(this.state.value));
        break;
      case WORK_GOAL:
        this.props.setDefaultWorkGoal(parseInt(this.state.value));
        break;
      case BREAK_PERIOD:
        this.props.setDefaultBreakPeriod(parseInt(this.state.value));
        break;
      default:
        console.error('invalid focus attribute');
    }

    this.setState({
      modalShow: false,
    });
  };

  _onCancel = () => {
    this.setState({
      modalShow: false,
    });
  };

  _renderLogout = ({ item, index, section: { title, data } }) => {
    return (
      <TouchableOpacity 
        key={index} 
        onPress={() => this._selectSetting('Logout')}
      >
        <Text style={styles.settingsLogout}>
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

    return sectionData;
  };

  render() {
    return (
      <View style={styles.settingsContainer}>
        <SettingList
          sections={this._getSectionData()} 
          selectSetting={this._selectSetting}
        />

        <LTModal 
          style={styles.settingsModalContainer}
          show={this.state.modalShow}
          onPressBackdrop={this._onCancel}
        >
          <Text style={styles.settingsModalText}>
            {this.state.setting}
          </Text>

          <Picker
            style={styles.settingsModalPicker}
            selectedValue={this.state.value}
            onValueChange={(value, index) => this._onValueChange(value)}
          >
            {
              Array(40).fill().map((_, i) => 
                <Picker.Item 
                  key={i} 
                  label={(i + 1).toString()} 
                  value={(i + 1).toString()} 
                />
              )
            }
          </Picker>

          <Button
            title='Confirm'
            onPress={this._onConfirm}             
          />

          <Button
            title='Cancel'
            onPress={this._onCancel}             
          />
        </LTModal>
      </View>
    );
  };
};

const mapStateToProps = state => ({
  focuses: state.focuses,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setDefaultWorkPeriod: period => dispatch(setDefaultWorkPeriod(period)),
  setDefaultWorkGoal: goal => dispatch(setDefaultWorkGoal(goal)),
  setDefaultBreakPeriod: period => dispatch(setDefaultBreakPeriod(period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);