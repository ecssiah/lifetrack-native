import React from 'react';
import { connect } from 'react-redux';
import { 
  View, Text, TextInput, Button, Picker, TouchableOpacity 
} from 'react-native';
import Modal from 'react-native-modal';
import { 
  setName, setCategory,
  setWorkPeriod, setWorkGoal, setBreakPeriod,
} from '../../actions/FocusesActions';
import { 
  WORK_PERIOD, WORK_GOAL, BREAK_PERIOD,
  DEFAULT_WORK_PERIOD, DEFAULT_WORK_GOAL, DEFAULT_BREAK_PERIOD, 
} from '../../constants/Focus';
import createStyles from '../../styles';

const styles = createStyles({
  focusEditItem: {
    fontSize: 32, 
  },
  focusEditContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '8%',
  },
  focusEditInput: {
    width: 240, 
    height: 40, 
    borderWidth: 1,
    borderColor: 'gray', 
  },
  focusEditPickerContainer: {
    height: '50%',
    width: '86%',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
  },
});

class FocusEditScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      value: 1,
      attr: null,
      name: null,
      category: null,
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Focus',
  });

  componentDidMount() {
    this.setState({
      name: this.props.focuses[this.props.focus.id].name,
      category: this.props.focuses[this.props.focus.id].category,
    });
  };

  _selectSetting = attr => {
    let value;
    const focus = this.props.focuses[this.props.focus.id];

    switch (attr) {
      case WORK_PERIOD:
        value = focus.workPeriod.toString();
        break;
      case WORK_GOAL:
        value = focus.workGoal.toString();
        break;
      case BREAK_PERIOD:
        value = focus.breakPeriod.toString();
        break;
      default:
        console.error('invalid focus attribute');
    }

    this.setState({
      modalVisible: true,
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
        this.props.setWorkPeriod(this.props.focus.id, parseInt(this.state.value));
        break;
      case WORK_GOAL:
        this.props.setWorkGoal(this.props.focus.id, parseInt(this.state.value));
        break;
      case BREAK_PERIOD:
        this.props.setBreakPeriod(this.props.focus.id, parseInt(this.state.value));
        break;
      default:
        console.error('invalid focus attribute');
    }

    this.setState({
      modalVisible: false,
    });
  };

  _onCancel = () => {
    this.setState({
      modalVisible: false,
    });
  };

  _updateFocus = () => {
    const focus = this.props.focuses[this.props.focus.id];
    const docRef = db.collection('focuses').doc(this.props.focus.id);

    const updatedFocus = {
      id: docRef.id,
      userId: auth.currentUser.uid,
      name: this.state.name,
      category: this.state.category,
      time: focus.workPeriod,
      level: 0,
      experience: 0.0,
      periods: 0,
      working: true,
      timer: null,
      active: false,
      workPeriod: DEFAULT_WORK_PERIOD,
      workGoal: DEFAULT_WORK_GOAL,
      breakPeriod: DEFAULT_BREAK_PERIOD,
    };

    db.collection('focuses').doc(this.props.focus.id).set(focus).then(doc => {
      this.props.addFocus(updatedFocus);
      this.props.navigation.navigate('Focus');
    }).catch(err => {
      console.error(err);
    });
  };

  _onSetName = () => {
    this.props.setName(this.props.focus.id, this.state.name);
  };

  _onSetCategory = () => {
    this.props.setCategory(this.props.focus.id, this.state.category);
  };

  render() {
    const focus = this.props.focuses[this.props.focus.id];

    return (
      <View style={styles.focusEditContainer}>
        <Text style={styles.section} >Name</Text>

        <TextInput
          style={styles.focusEditInput}
          textAlign='center'
          keyboardAppearance='dark'
          onChangeText={name => this.setState({name})}
          onSubmitEditing={this._onSetName}
          returnKeyType='done'
          value={this.state.name}
        />

        <Text style={styles.section} >Category</Text>

        <TextInput
          style={styles.focusEditInput}
          textAlign='center'
          keyboardAppearance='dark'
          returnKeyType='done'
          onChangeText={category => this.setState({category})}
          onSubmitEditing={this._onSetCategory}
          value={this.state.category}
        />

        <TouchableOpacity onPress={() => this._selectSetting(WORK_PERIOD)}>
          <Text style={styles.focusEditItem}>
            Work Period: {focus.workPeriod}
          </Text> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._selectSetting(WORK_GOAL)}>
          <Text style={styles.focusEditItem}>
            Work Goal: {focus.workGoal}
          </Text> 
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._selectSetting(BREAK_PERIOD)}>
          <Text style={styles.focusEditItem}>
            Break Period: {focus.breakPeriod}
          </Text> 
        </TouchableOpacity>

        <Modal 
          isVisible={this.state.modalVisible}
          onBackdropPress={() => this.setState({ modalVisible: false })}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View style={styles.focusEditPickerContainer} >
            <Picker
              selectedValue={this.state.value}
              onValueChange={(value, index) => this._onValueChange(value)}
              style={{
                height: '70%',
                width: '80%',
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
          </View>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  focus: state.focus,
  focuses: state.focuses,
});

const mapDispatchToProps = dispatch => ({
  setName: (id, name) => dispatch(setName(id, name)),
  setCategory: (id, category) => dispatch(setCategory(id, category)),
  setWorkPeriod: (id, period) => dispatch(setWorkPeriod(id, period)),
  setWorkGoal: (id, goal) => dispatch(setWorkGoal(id, goal)),
  setBreakPeriod: (id, period) => dispatch(setBreakPeriod(id, period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusEditScreen);