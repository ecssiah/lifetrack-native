import React from 'react';
import { connect } from 'react-redux';
import { db, auth } from '../../config';
import firebase from 'firebase';
import { 
  View, Text, TextInput, Picker, TouchableOpacity 
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
} from '../../constants/Focus';
import createStyles, { Colors } from '../../styles';

import LTModal from '../../components/LTModal';
import LTIcon from '../../components/LTIcon';
import SettingItem from '../../components/SettingItem';
import SettingList from '../../components/SettingList';
import LTConfirm from '../../components/LTConfirm';

const styles = createStyles({
  editContainer: {
    flex: 1,
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
  editDeleteText: {
    fontSize: 26,
    textAlign: 'center',
    color: 'red',
    margin: 16,
  },
  editSettingModalContainer: {
    height: '50%',
    width: '86%',
  },
  editSettingModalTitle: {
    fontSize: 24,
  },
  editSettingModalPicker: {
    height: '70%',
    width: '80%',
  },
  editSettingModalButton: {
    fontSize: 18,
    color: 'blue',
  },
  editCategoryModalContainer: {
    height: '46%',
    width: '86%',
  },
  editCategoryModalInput: {
    width: 272,
    height: 40, 
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray', 
  },
  editCategoryModalPicker: {
    flex: 2,
    height: 60,
    width: 110,
  },
  editCategoryModalButton: {
    fontSize: 18,
    color: 'blue',
  },
  editDeleteModalContainer: {
    height: '28%',
    width: '86%',
  },
  editDeleteModalText: {
    fontSize: 24,
    textAlign: 'center', 
    marginHorizontal: 4,
    marginBottom: 20, 
  },
  editDeleteModalButton: {
    fontSize: 18,
    color: 'blue',
  },
});

class FocusEditScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.focuses[props.focus.id].name,
      categoryName: props.focuses[props.focus.id].category,
      newCategoryName: '',
      settingName: '',
      settingValue: 1,
      editCategoryModalShow: false,
      editSettingModalShow: false,
      editDeleteModalShow: false,
      editNameInputStyle: styles.editNameInputBlur,
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

  _onEditNameConfirm = () => {
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

  _onSettingSelect = settingName => {
    let settingValue;
    const focus = this.props.focuses[this.props.focus.id];

    switch (settingName) {
      case WORK_PERIOD:
        settingValue = focus.workPeriod.toString();
        break;
      case WORK_GOAL:
        settingValue = focus.workGoal.toString();
        break;
      case BREAK_PERIOD:
        settingValue = focus.breakPeriod.toString();
        break;
      default:
        console.error('invalid setting: ' + settingName);
    }

    this.setState({
      settingName,
      settingValue,
      editSettingModalShow: true,
    });
  };

  _onSettingValueChange = settingValue => {
    this.setState({
      settingValue,
    });
  };

  _onSettingConfirm = () => {
    switch (this.state.settingName) {
      case WORK_PERIOD:
        this.props.setWorkPeriod(
          this.props.focus.id, parseInt(this.state.settingValue)
        );
        break;
      case WORK_GOAL:
        this.props.setWorkGoal(
          this.props.focus.id, parseInt(this.state.settingValue)
        );
        break;
      case BREAK_PERIOD:
        this.props.setBreakPeriod(
          this.props.focus.id, parseInt(this.state.settingValue)
        );
        break;
      default:
        console.error('invalid focus attribute');
    }

    this.setState({
      editSettingModalShow: false,
    });
  };

  _onSettingCancel = () => {
    this.setState({
      editSettingModalShow: false,
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

  _onCategorySelect = () => {
    this.setState({
      newCategoryName: '',
      editCategoryModalShow: true, 
    });
  };

  _onCategoryNameChange = categoryName => {
    this.setState({
      categoryName,
    });
  };

  _onCategoryConfirm = () => {
    let categoryName;

    if (this.state.newCategoryName === '') {
      categoryName = this.state.categoryName;
    } else {
      categoryName = this.state.newCategoryName;

      const category = {
        name: categoryName,
        show: true,
      };

      db.collection('categories').doc(auth.currentUser.uid).update({
        list: firebase.firestore.FieldValue.arrayUnion(category),
      });

      this.props.addCategory(category);
    }

    this.props.setCategory(this.props.focus.id, categoryName);

    this.setState({
      categoryName,
      editCategoryModalShow: false,
    });
  };

  _onCategoryCancel = () => {
    this.setState({
      categoryName: this.props.focuses[this.props.focus.id].category,
      editCategoryModalShow: false,
    });
  };

  _getCategoryItems = () => {
    return (
      this.props.categories.map((category, idx) => 
        <Picker.Item 
          key={idx} 
          label={category.name} 
          value={category.name}
        />
      )
    );
  };

  _onDeleteSelect = () => {
    this.setState({
      editDeleteModalShow: true,
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
      editDeleteModalShow: false,
    });
  };

  _onDeleteCancel = () => {
    this.setState({
      editDeleteModalShow: false,
    });
  };

  _renderName = ({ item, index, section: { title, data } }) => {
    return (
      <TextInput
        style={this.state.editNameInputStyle}
        placeholder='Focus Name'
        value={this.state.name}
        textAlign='center'
        returnKeyType='done'
        keyboardAppearance='dark'
        selectionColor={Colors.primary}
        onBlur={this._onEditInputBlur}
        onFocus={this._onEditInputFocus}
        onChangeText={name => this.setState({name})}
        onSubmitEditing={this._onEditNameConfirm}
      />
    );
  };

  _renderCategory = ({ item, index, section: { title, data} }) => {
    return (
      <SettingItem 
        setting={item} 
        onSettingSelect={this._onCategorySelect} 
      />
    );
  };

  _renderDelete = ({ item, index, section: { title, data } }) => {
    return (
      <TouchableOpacity 
        key={index} 
        onPress={this._onDeleteSelect}
      >
        <Text style={styles.editDeleteText}>
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
        <View style={styles.container}>
          <SettingList
            sections={this._getSectionData()} 
            onSettingSelect={this._onSettingSelect}
          />

          <LTModal
            style={styles.editCategoryModalContainer}
            show={this.state.editCategoryModalShow} 
            onPressBackdrop={this._onCategoryCancel}
          >
            <TextInput
              style={styles.editCategoryModalInput}
              value={this.state.newCategoryName}
              placeholder={'New Category'}
              maxLength={24}
              textAlign='center'
              returnKeyType='done'
              keyboardAppearance='dark'
              onChangeText={newCategoryName => this.setState({newCategoryName})}
            />

            <Picker
              style={styles.editCategoryModalPicker}
              selectedValue={this.state.categoryName}
              onValueChange={categoryName => 
                this._onCategoryNameChange(categoryName)
              }
            >
              {this._getCategoryItems()}
            </Picker>

            <LTConfirm
              onPressLeft={this._onCategoryConfirm} 
              onPressRight={this._onCategoryCancel}
            />
          </LTModal>

          <LTModal
            style={styles.editSettingModalContainer}
            show={this.state.editSettingModalShow}
            onPressBackdrop={this._onSettingCancel}
          >
            <Text style={styles.editSettingModalTitle}>
              {this.state.settingName}
            </Text>

            <Picker
              selectedValue={this.state.settingValue}
              onValueChange={value => this._onSettingValueChange(value)}
              style={styles.editSettingModalPicker}
            >
              {this._getSettingRange(1, 40)}
            </Picker>

            <LTConfirm
              onPressLeft={this._onSettingConfirm} 
              onPressRight={this._onSettingCancel}
            />
          </LTModal>

          <LTModal
            style={styles.editDeleteModalContainer}
            show={this.state.editDeleteModalShow}
            onPressBackdrop={this._onDeleteCancel} 
          >
            <Text style={styles.editDeleteModalText}>
              Are you sure you want to delete this focus?
            </Text>
              
            <LTConfirm
              onPressLeft={this._onDeleteConfirm} 
              onPressRight={this._onDeleteCancel}
            />
          </LTModal>
        </View>
      );
    } else {
      return null;
    }
  }
};

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