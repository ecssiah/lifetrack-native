import React from 'react';
import { connect } from 'react-redux';
import { 
  Button, Modal, Picker, Text, TouchableOpacity, View 
} from 'react-native';
import { auth } from '../../config';
import {
  updateWorkPeriods, updateBreakPeriods
} from '../../actions/FocusesActions';
import { 
  setWorkPeriod, setWorkGoal, setBreakPeriod 
} from '../../actions/SettingsActions';
import createStyles, { Fonts, Colors } from '../../styles'; 

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
      currentSetting: '',
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
    if (this.state.currentSetting === 'workPeriod') {
      this.props.setWorkPeriod(value);
      this.props.updateWorkPeriods(value);
    } else if (this.state.currentSetting === 'workGoal') {
      this.props.setWorkGoal(value);
    } else if (this.state.currentSetting === 'breakPeriod') {
      this.props.setBreakPeriod(value);
      this.props.updateBreakPeriods(value);
    }

    this._closeModal();
  };

  _getCurrentSettingValue() {
    // doesn't change when prop.settings updates
    // initial picker value is set before modal is loaded

    if (this.state.currentSetting === 'workPeriod') {
      return this.props.settings.workPeriod;
    } else if (this.state.currentSetting === 'workGoal') {
      return this.props.settings.workGoal;
    } else if (this.state.currentSetting === 'breakPeriod') {
      return this.props.settings.breakPeriod;
    }
  };  

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Logout"
          onPress={this._logoutUser}
        />

        <TouchableOpacity onPress={() => this._selectSetting("workPeriod")}>
          <Text style={styles.settingsItem}>
            Work Period: {this.props.settings.workPeriod}
          </Text> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._selectSetting("workGoal")}>
          <Text style={styles.settingsItem}>
            Work Goal: {this.props.settings.workGoal}
          </Text> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._selectSetting("breakPeriod")}>
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
  updateWorkPeriods: period => dispatch(updateWorkPeriods(period)),
  updateBreakPeriods: period => dispatch(updateBreakPeriods(period)),
  setWorkPeriod: period => dispatch(setWorkPeriod(period)),
  setWorkGoal: goal => dispatch(setWorkGoal(goal)),
  setBreakPeriod: period => dispatch(setBreakPeriod(period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);