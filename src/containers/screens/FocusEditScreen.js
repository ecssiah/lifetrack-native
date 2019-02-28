import React from 'react';
import { connect } from 'react-redux';
import { db } from '../../config';
import { 
  View, Text, TextInput, Button, Picker, TouchableOpacity 
} from 'react-native';
import {
  addCategory,
} from '../../actions/CategoriesActions';
import { 
  deleteFocus,
  setName, setCategory,
  setWorkPeriod, setWorkGoal, setBreakPeriod,
} from '../../actions/FocusesActions';
import { 
  WORK_PERIOD, WORK_GOAL, BREAK_PERIOD,
  DEFAULT_WORK_PERIOD, DEFAULT_WORK_GOAL, DEFAULT_BREAK_PERIOD, 
} from '../../constants/Focus';
import createStyles from '../../styles';

import LTModal from '../../components/LTModal';

const styles = createStyles({
  editItem: {
    fontSize: 32, 
  },
  editContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '8%',
  },
  editModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModalContainer: {
    height: '50%',
    width: '86%',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  editPicker: {
    height: '70%',
    width: '80%',
  },
  editInput: {
    width: 240, 
    height: 40, 
    borderWidth: 1,
    borderColor: 'gray', 
  },
  editDelete: {
    fontSize: 22,
    textAlign: 'center',
    color: 'red',
  },
  deleteModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteModalText: {
    textAlign: 'center',
    fontSize: 24,
  },
  deleteModalContainer: {
    height: '28%',
    width: '86%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  categoryText: {
    margin: 10,
    fontSize: 24,
  },
  focusEditTextInput: {
    width: 240, 
    height: 40, 
    borderWidth: 1,
    borderColor: 'gray', 
  },
});

class FocusEditScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 1,
      attr: null,
      name: props.focuses[props.focus.id].name,
      category: props.focuses[props.focus.id].category,
      newCategory: null,
      categoryModalShow: false,
      editModalShow: false,
      deleteModalShow: false,
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Focus',
  });

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
      editModalShow: true,
      attr,
      value,
    });
  };

  _onValueChange = value => {
    this.setState({
      value,
    });
  };

  _onEditConfirm = () => {
    switch (this.state.attr) {
      case WORK_PERIOD:
        this.props.setWorkPeriod(
          this.props.focus.id, parseInt(this.state.value)
        );
        break;
      case WORK_GOAL:
        this.props.setWorkGoal(
          this.props.focus.id, parseInt(this.state.value)
        );
        break;
      case BREAK_PERIOD:
        this.props.setBreakPeriod(
          this.props.focus.id, parseInt(this.state.value)
        );
        break;
      default:
        console.error('invalid focus attribute');
    }

    this.setState({
      editModalShow: false,
    });
  };

  _onEditCancel = () => {
    this.setState({
      editModalShow: false,
    });
  };

  _onClickDelete = () => {
    this.setState({
      deleteModalShow: true,
    });
  };

  _onDeleteConfirm = () => {
    db.collection('focuses').doc(this.props.focus.id).delete().then(() => {
      this.props.deleteFocus(this.props.focus.id);
      this.props.navigation.navigate('Focuses', );
    }).catch(err => {
      console.error(err);
    }); 

    this.setState({
      deleteModalShow: false,
    });
  };

  _onDeleteCancel = () => {
    this.setState({
      deleteModalShow: false,
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

  _onClickCategory = () => {
    this.setState({
      categoryModalShow: true, 
      newCategory: '',
    });
  };

  _onCategoryChange = category => {
    this.setState({
      category,
    });
  };

  _onCategoryConfirm = () => {
    let category;

    if (this.state.newCategory !== '') {
      category = this.state.newCategory;
      this.props.addCategory(this.state.newCategory);
    } else {
      category = this.state.category;
    }

    this.props.setCategory(this.props.focus.id, category);

    this.setState({
      category: category,
      categoryModalShow: false,
    });
  };

  _onCategoryCancel = () => {
    this.setState({
      categoryModalShow: false,
    });
  };

  render() {
    const focus = this.props.focuses[this.props.focus.id];

    if (focus) {
      return (
        <View style={styles.editContainer}>
          <Text style={styles.section} >Name</Text>
          <TextInput
            style={styles.editInput}
            value={this.state.name}
            textAlign='center'
            keyboardAppearance='dark'
            returnKeyType='done'
            onChangeText={name => this.setState({name})}
            onSubmitEditing={this._onSetName}
          />

          <TouchableOpacity
            onPress={this._onClickCategory} 
          >
            <Text style={styles.categoryText}>
              Category: {this.state.category}
            </Text>  
          </TouchableOpacity>

          <LTModal
            show={this.state.categoryModalShow} 
            onPressBackdrop={this._onCategoryCancel}
          >
            <Text style={{fontSize: 24}}>
              Create New Category:
            </Text>

            <TextInput
              style={styles.focusEditTextInput}
              textAlign='center'
              keyboardAppearance='dark'
              maxLength={24}
              returnKeyType='done'
              onChangeText={newCategory => this.setState({newCategory})}
              value={this.state.newCategory}
            />

            <Picker
              selectedValue={this.state.category}
              onValueChange={(value, index) => this._onCategoryChange(value)}
              style={{
                height: '70%',
                width: '80%',
                marginBottom: 10,
              }}
            >
              {
                this.props.categories.types.map((category, idx) => 
                  <Picker.Item 
                    key={idx} 
                    label={category} 
                    value={category}
                  />
                )
              }
            </Picker>

            <Button
              title='Done'
              onPress={this._onCategoryConfirm}
            />
          </LTModal>

          <TouchableOpacity onPress={() => this._selectSetting(WORK_PERIOD)}>
            <Text style={styles.editItem}>
              Work Period: {focus.workPeriod}
            </Text> 
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._selectSetting(WORK_GOAL)}>
            <Text style={styles.editItem}>
              Work Goal: {focus.workGoal}
            </Text> 
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this._selectSetting(BREAK_PERIOD)}>
            <Text style={styles.editItem}>
              Break Period: {focus.breakPeriod}
            </Text> 
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this._onClickDelete}
          >
            <Text style={styles.editDelete} >
              Delete
            </Text>
          </TouchableOpacity>

          <LTModal
            show={this.state.editModalShow}
            onPressBackdrop={this._onEditCancel}
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
              onPress={this._onEditConfirm}             
            />

            <Button
              title='Cancel'
              onPress={this._onEditCancel}             
            />
          </LTModal>

          <LTModal
            show={this.state.deleteModalShow}
            onPressBackdrop={this._onDeleteCancel} 
            height={'34%'}
          >
            <Text style={{marginBottom: 20, textAlign: 'center', fontSize: 24, }}>
              Are you sure you want to permanently delete this focus?
            </Text>
              
            <Button
              title='Confirm'
              onPress={this._onDeleteConfirm}             
            />

            <Button
              title='Cancel'
              onPress={this._onDeleteCancel}             
            />
          </LTModal>
        </View>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  focus: state.focus,
  focuses: state.focuses,
});

const mapDispatchToProps = dispatch => ({
  addCategory: category => dispatch(addCategory(category)),
  deleteFocus: id => dispatch(deleteFocus(id)),
  setName: (id, name) => dispatch(setName(id, name)),
  setCategory: (id, category) => dispatch(setCategory(id, category)),
  setWorkPeriod: (id, period) => dispatch(setWorkPeriod(id, period)),
  setWorkGoal: (id, goal) => dispatch(setWorkGoal(id, goal)),
  setBreakPeriod: (id, period) => dispatch(setBreakPeriod(id, period)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusEditScreen);