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
import createStyles, { Colors } from '../../styles';

import LTModal from '../../components/LTModal';
import LTIcon from '../../components/LTIcon';
import SettingItem from '../../components/SettingItem';
import SettingList from '../../components/SettingList';

const styles = createStyles({
  editContainer: {
    flex: 1,
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
  editText: {
    fontSize: 24,
    margin: 4,
  },
  editNameInputBlur: {
    fontSize: 36, 
    fontWeight: 'bold',
    borderColor: 'black',
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 0,
    margin: 8,
    paddingVertical: 9,
    paddingHorizontal: 15,
  },
  editNameInputFocus: {
    fontSize: 36, 
    fontWeight: 'bold',
    borderColor: 'black',
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
    margin: 8,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  editModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editModalText: {
    fontSize: 24,
  },
  editModalPicker: {
    height: '70%',
    width: '80%',
    marginBottom: -32,
  },
  editInput: {
    width: 240, 
    height: 40, 
    fontSize: 22,
  },
  editDelete: {
    fontSize: 26,
    textAlign: 'center',
    color: 'red',
    margin: 16,
  },
  categoryModalContainer: {
    height: '46%',
    width: '86%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  categoryText: {
    fontSize: 24,
    marginBottom: 4,
  },
  categoryModalText: {
    fontSize: 24, 
    marginBottom: 4,
  },
  categoryModalInput: {
    width: 272,
    height: 40, 
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray', 
  },
  categoryModalPicker: {
    height: '70%',
    width: '80%',
    marginBottom: -32,
  },
  deleteModalContainer: {
    height: '28%',
    width: '86%',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  deleteModalText: {
    fontSize: 24,
    textAlign: 'center', 
    marginHorizontal: 4,
    marginBottom: 20, 
  },
});

class FocusEditScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 1,
      setting: null,
      newCategory: null,
      name: props.focuses[props.focus.id].name,
      category: props.focuses[props.focus.id].category,
      editNameInputStyle: styles.editNameInputBlur,
      categoryModalShow: false,
      editModalShow: false,
      deleteModalShow: false,
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Focus',
    headerLeft: (
      <LTIcon
        type='ios-arrow-back'
        size={32}
        onPress={() => navigation.goBack()}
      />
    ),
  });

  _selectSetting = setting => {
    let value;
    const focus = this.props.focuses[this.props.focus.id];

    switch (setting) {
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
      setting,
      value,
    });
  };

  _onValueChange = value => {
    this.setState({
      value,
    });
  };

  _onEditConfirm = () => {
    switch (this.state.setting) {
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
      this.props.navigation.navigate('Focuses');
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

  _onEditInputFocus = () => {
    this.setState({
      editNameInputStyle: styles.editNameInputFocus,
    });
  };

  _onEditInputBlur = () => {
    this.setState({
      editNameInputStyle: styles.editNameInputBlur,
    });
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
    let categoryName;

    if (this.state.newCategory !== '') {
      categoryName = this.state.newCategory;

      const category = {
        name: categoryName,
        show: true,
      };

      const catRef = db.collection('categories').doc(auth.currentUser.uid);
      catRef.update({
        list: firebase.firestore.FieldValue.arrayUnion(category),
      });

      this.props.addCategory(category);
    } else {
      categoryName = this.state.category;
    }

    this.props.setCategory(this.props.focus.id, categoryName);

    this.setState({
      category: categoryName,
      categoryModalShow: false,
    });
  };

  _onCategoryCancel = () => {
    this.setState({
      categoryModalShow: false,
    });
  };

  _selectSetting = setting => {
    let value;
    const focus = this.props.focuses[this.props.focus.id];

    switch (setting) {
      case 'Category':
        value = focus.category;
        break;
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
      setting,
      value,
    });
  };

  _renderName = ({ item, index, section: { title, data } }) => {
    return (
      <TextInput
        style={this.state.editNameInputStyle}
        selectionColor={Colors.primary}
        value={this.state.name}
        textAlign='center'
        returnKeyType='done'
        keyboardAppearance='dark'
        onChangeText={name => this.setState({name})}
        onSubmitEditing={this._onSetName}
        onBlur={this._onEditInputBlur}
        onFocus={this._onEditInputFocus}
      />
    );
  };

  _renderCategory = ({ item, index, section: { title, data} }) => {
    return (
      <SettingItem 
        setting={item} 
        selectSetting={this._onClickCategory} 
      />
    );
  };

  _renderDelete = ({ item, index, section: { title, data } }) => {
    return (
      <TouchableOpacity 
        key={index} 
        onPress={this._onClickDelete}
      >
        <Text style={styles.editDelete}>
          {item.name}
        </Text>
      </TouchableOpacity> 
    );
  };

  _getSectionData = () => {
    let sectionData = [];
    const focus = this.props.focuses[this.props.focus.id];

    sectionData.push({
      title: '',
      data: [
        { name: '', value: focus.name },
      ],
      renderItem: this._renderName,
    });

    sectionData.push({
      title: '',
      data: [ 
        { name: 'Category', value: focus.category },
      ],
      renderItem: this._renderCategory,
    });

    sectionData.push({
      title: '',
      data: [ 
        { name: WORK_PERIOD, value: focus.workPeriod },
        { name: WORK_GOAL, value: focus.workGoal },
        { name: BREAK_PERIOD, value: focus.breakPeriod },
      ],
    });

    sectionData.push({
      title: '',
      data: [
        { name: 'Delete', value: '' },
      ],
      renderItem: this._renderDelete,
    })

    sectionData.push({
      title: '',
      data: [],
    });

    return sectionData;
  };

  render() {
    const focus = this.props.focuses[this.props.focus.id];

    if (focus) {
      return (
        <View style={styles.editContainer}>
          <SettingList
            sections={this._getSectionData()} 
            selectSetting={this._selectSetting}
          />

          <LTModal
            style={styles.categoryModalContainer}
            show={this.state.categoryModalShow} 
            onPressBackdrop={this._onCategoryCancel}
          >
            <Text style={styles.categoryModalText}>
              New Category:
            </Text>

            <TextInput
              style={styles.categoryModalInput}
              textAlign='center'
              keyboardAppearance='dark'
              maxLength={24}
              returnKeyType='done'
              onChangeText={newCategory => this.setState({newCategory})}
              value={this.state.newCategory}
            />

            <Picker
              style={styles.categoryModalPicker}
              selectedValue={this.state.category}
              onValueChange={(value, index) => this._onCategoryChange(value)}
            >
              {
                this.props.categories.map((category, idx) => 
                  <Picker.Item 
                    key={idx} 
                    label={category.name} 
                    value={category.name}
                  />
                )
              }
            </Picker>

            <Button
              title='Done'
              onPress={this._onCategoryConfirm}
            />
          </LTModal>

          <LTModal
            style={styles.editModalContainer}
            show={this.state.editModalShow}
            onPressBackdrop={this._onEditCancel}
          >
            <Text style={styles.editModalText}>
              {this.state.setting}
            </Text>

            <Picker
              selectedValue={this.state.value}
              onValueChange={(value, index) => this._onValueChange(value)}
              style={styles.editModalPicker}
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
            style={styles.deleteModalContainer}
            show={this.state.deleteModalShow}
            onPressBackdrop={this._onDeleteCancel} 
          >
            <Text style={styles.deleteModalText}>
              Are you sure you want to delete this focus?
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