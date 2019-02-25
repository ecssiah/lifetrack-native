import React from 'react';
import { connect } from 'react-redux';
import { 
  Button, Modal, Picker, Text, TouchableOpacity, View 
} from 'react-native';
import { auth } from '../../config';
import { 
  WORK_PERIOD, WORK_GOAL, BREAK_PERIOD,
} from '../../constants/Focus';
import { 
  setGlobalWorkPeriod, setGlobalWorkGoal, setGlobalBreakPeriod, 
} from '../../actions/SettingsActions';
import {
  updateWorkPeriods, updateBreakPeriods,
} from '../../actions/FocusesActions';
import createStyles from '../../styles'; 

const styles = createStyles({
  settingsItem: {
    fontSize: 32, 
  },
  settingsPicker: {
    width: 260,
    height: 120,
  },
});

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSetting: null,
      modalVisible: false,
    };
  };

  static navigationOptions = {
    title: 'Settings',
  };

  _logoutUser = () => {
    auth.signOut().then(() => {
      this.props.navigation.navigate('Login');
    });
  };

  _selectSetting = setting => {
    this.setState({
      currentSetting: setting,
      modalVisible: true,
    });
  };

  _closeModal = () => {
    this.setState({
      currentSetting: '',
      modalVisible: false,
    });
  };

  _onValueChange = value => {
    switch (this.state.currentSetting) {
      case WORK_PERIOD:
        this.props.setGlobalWorkPeriod(value);
        break;
      case WORK_GOAL:
        this.props.setGlobalWorkGoal(value);
        break;
      case BREAK_PERIOD:
        this.props.setGlobalBreakPeriod(value);
        break;
      default:
        console.error('invalid setting attribute');
    }

    this._closeModal();
  };

  _getCurrentSettingValue() {
    // doesn't change when prop.settings updates
    // initial picker value is set before modal is loaded

    switch (this.state.currentSetting) {
      case WORK_PERIOD:
        return this.props.settings.workPeriod;
      case WORK_GOAL:
        return this.props.settings.workGoal;
      case BREAK_PERIOD:
        return this.props.settings.breakPeriod;
      default:
        return 1;
    }
  };  

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Logout"
          onPress={this._logoutUser}
        />

        <TouchableOpacity onPress={() => this._selectSetting(WORK_PERIOD)}>
          <Text style={styles.settingsItem}>
            Work Period: {this.props.settings.workPeriod}
          </Text> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._selectSetting(WORK_GOAL)}>
          <Text style={styles.settingsItem}>
            Work Goal: {this.props.settings.workGoal}
          </Text> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._selectSetting(BREAK_PERIOD)}>
          <Text style={styles.settingsItem}>
            Break Period: {this.props.settings.breakPeriod}
          </Text> 
        </TouchableOpacity>
        
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible} 
        >
          <View style={styles.container} >
            <Picker
              style={styles.settingsPicker}
              selectedValue={this._getCurrentSettingValue()}
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
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setGlobalWorkPeriod: period => dispatch(setGlobalWorkPeriod(period)),
  setGlobalWorkGoal: goal => dispatch(setGlobalWorkGoal(goal)),
  setGlobalBreakPeriod: period => dispatch(setGlobalBreakPeriod(period)),
  updateWorkPeriods: period => dispatch(updateWorkPeriods(period)),
  updateBreakPeriods: period => dispatch(updateBreakPeriods(period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);