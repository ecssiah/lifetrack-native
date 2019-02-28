import React from 'react';
import { connect } from 'react-redux';
import { 
  Button, Modal, Picker, Text, TouchableOpacity, TouchableHighlight, View 
} from 'react-native';
import { auth } from '../../config';
import { 
  WORK_PERIOD, WORK_GOAL, BREAK_PERIOD,
} from '../../constants/Focus';
import { 
  setDefaultWorkPeriod, setDefaultWorkGoal, setDefaultBreakPeriod, 
} from '../../actions/SettingsActions';
import createStyles from '../../styles'; 
import LTModal from '../../components/LTModal';

const styles = createStyles({
  settingsItem: {
    fontSize: 32, 
  },
  settingsPicker: {
    width: 260,
    height: 120,
  },
  settingsPickerContainer: {
    height: '50%',
    width: '86%',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
  },
});

class SettingsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      attr: null,
      value: null,
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

  _selectSetting = attr => {
    let value;

    switch (attr) {
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
        console.error('invalid focus attribute');
    }

    this.setState({
      modalShow: true,
      attr,
      value,
    });
  };

  _onValueChange = value => {
    this.setState({
      value,
    });
  };

  _onConfirm = () => {
    switch (this.state.attr) {
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

  render() {
    return (
      <View style={styles.container}>
        <Button
          title="Logout"
          onPress={this._logoutUser}
        />

        <TouchableOpacity onPress={() => this._selectSetting(WORK_PERIOD)}>
          <Text style={styles.settingsItem}>
            Default Work Period: {this.props.settings.workPeriod}
          </Text> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._selectSetting(WORK_GOAL)}>
          <Text style={styles.settingsItem}>
            Default Work Goal: {this.props.settings.workGoal}
          </Text> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._selectSetting(BREAK_PERIOD)}>
          <Text style={styles.settingsItem}>
            Default Break Period: {this.props.settings.breakPeriod}
          </Text> 
        </TouchableOpacity>

        <LTModal 
          show={this.state.modalShow}
          onPressBackdrop={this._onCancel}
        >
          <Picker
            selectedValue={this.state.value}
            onValueChange={(value, index) => this._onValueChange(value)}
            style={{
              height: '70%',
              width: '80%',
              marginBottom: 10,
            }}
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
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setDefaultWorkPeriod: period => dispatch(setDefaultWorkPeriod(period)),
  setDefaultWorkGoal: goal => dispatch(setDefaultWorkGoal(goal)),
  setDefaultBreakPeriod: period => dispatch(setDefaultBreakPeriod(period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);