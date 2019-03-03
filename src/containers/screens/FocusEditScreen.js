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
import createStyles, { Color, FontSize } from '../../styles';

import LTModal from '../../components/LTModal';
import LTIcon from '../../components/LTIcon';
import SettingItem from '../../components/SettingItem';
import SettingList from '../../components/SettingList';
import LTConfirm from '../../components/LTConfirm';

const styles = createStyles({
  nameInputBlur: {
    fontSize: FontSize.modalTitle, 
    color: 'black',
    borderWidth: 0,
    borderRadius: 6,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingVertical: 9,
    paddingHorizontal: 15,
    margin: 8,
  },
  nameInputFocus: {
    fontSize: FontSize.modalTitle, 
    color: 'black',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 14,
    margin: 8,
  },
  deleteText: {
    fontSize: FontSize.modalTitle,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.highlight,
    margin: 16,
  },
  categoryModalContainer: {
    height: '80%',
  },
  categoryModalInput: {
    width: '86%',
    height: 40, 
    fontSize: FontSize.modalInput,
    marginTop: 14,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray', 
  },
  categoryModalPicker: {
    width: '86%',
  },
  settingsModalContainer: {
    height: '78%',
  },
  settingsModalTitle: {
    fontSize: FontSize.modalTitle,
    marginTop: 14,
  },
  settingsModalPicker: {
    width: '86%',
  },
  deleteModalContainer: {
    height: '36%',
  },
  deleteModalText: {
    fontSize: FontSize.modalTitle,
    textAlign: 'center', 
    marginTop: 12,
    marginHorizontal: 4,
  },
});

class FocusEditScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.focuses[props.focus.id].name,
      nameInputStyle: styles.nameInputBlur,
      categoryName: props.focuses[props.focus.id].category,
      newCategoryName: '',
      settingName: '',
      settingValue: 1,
      categoryModalShow: false,
      settingsModalShow: false,
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

  _onEditNameConfirm = () => {
    this.props.setName(this.props.focus.id, this.state.name);
  };

  _onEditNameFocus = () => {
    this.setState({
      nameInputStyle: styles.nameInputFocus,
    });
  };

  _onEditNameBlur = () => {
    this.setState({
      nameInputStyle: styles.nameInputBlur,
    });
  };

  _onSettingSelect = settingName => {
    let settingValue;
    const focus = this.props.focuses[this.props.focus.id];

    switch (settingName) {
      case WORK_PERIOD: {
        settingValue = focus.workPeriod.toString();
        break;
      }
      case WORK_GOAL: {
        settingValue = focus.workGoal.toString();
        break;
      }
      case BREAK_PERIOD: {
        settingValue = focus.breakPeriod.toString();
        break;
      }
      default: {
        console.error('invalid setting: ' + settingName);
      }
    }

    this.setState({
      settingName,
      settingValue,
      settingsModalShow: true,
    });
  };

  _onSettingChange = settingValue => {
    this.setState({
      settingValue,
    });
  };

  _onSettingConfirm = () => {
    switch (this.state.settingName) {
      case WORK_PERIOD: {
        this.props.setWorkPeriod(
          this.props.focus.id, parseInt(this.state.settingValue)
        );
        break;
      }
      case WORK_GOAL: {
        this.props.setWorkGoal(
          this.props.focus.id, parseInt(this.state.settingValue)
        );
        break;
      }
      case BREAK_PERIOD: {
        this.props.setBreakPeriod(
          this.props.focus.id, parseInt(this.state.settingValue)
        );
        break;
      }
      default: {
        console.error('invalid focus attribute');
      }
    }

    this.setState({
      settingsModalShow: false,
    });
  };

  _onSettingCancel = () => {
    this.setState({
      settingsModalShow: false,
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
      categoryModalShow: true, 
    });
  };

  _onCategoryChange = categoryName => {
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
      categoryModalShow: false,
    });
  };

  _onCategoryCancel = () => {
    this.setState({
      categoryName: this.props.focuses[this.props.focus.id].category,
      categoryModalShow: false,
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

  _renderName = () => {
    return (
      <TextInput
        style={this.state.nameInputStyle}
        placeholder='Focus Name'
        value={this.state.name}
        textAlign='center'
        maxLength={24}
        returnKeyType='done'
        keyboardAppearance='dark'
        selectionColor={Color.primary}
        onBlur={this._onEditNameBlur}
        onFocus={this._onEditNameFocus}
        onChangeText={name => this.setState({name})}
        onSubmitEditing={this._onEditNameConfirm}
      />
    );
  };

  _renderCategory = ({item}) => {
    return (
      <SettingItem 
        setting={item} 
        onSettingSelect={this._onCategorySelect} 
      />
    );
  };

  _renderDelete = ({item, index}) => {
    return (
      <TouchableOpacity 
        key={index} 
        onPress={this._onDeleteSelect}
      >
        <Text style={styles.deleteText}>
          {item.name}
        </Text>
      </TouchableOpacity> 
    );
  };

  _getSectionData = () => {
    const focus = this.props.focuses[this.props.focus.id];

    const sectionData = [
      {
        title: '',
        data: [
          { name: '', value: focus.name },
        ],
        renderItem: this._renderName,
      },
      {
        title: '',
        data: [ 
          { name: 'Category', value: focus.category },
        ],
        renderItem: this._renderCategory,
      },
      {
        title: '',
        data: [ 
          { name: WORK_PERIOD, value: focus.workPeriod },
          { name: WORK_GOAL, value: focus.workGoal },
          { name: BREAK_PERIOD, value: focus.breakPeriod },
        ],
      },
      {
        title: '',
        data: [
          { name: 'Delete', value: '' },
        ],
        renderItem: this._renderDelete,
      },
      {
        title: '',
        data: [],
      },
    ];

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
            style={styles.categoryModalContainer}
            show={this.state.categoryModalShow} 
            onPressBackdrop={this._onCategoryCancel}
          >
            <TextInput
              style={styles.categoryModalInput}
              value={this.state.newCategoryName}
              placeholder={'New Category'}
              maxLength={24}
              textAlign='center'
              returnKeyType='done'
              keyboardAppearance='dark'
              onChangeText={newCategoryName => {
                this.setState({newCategoryName})
              }}
            />

            <Picker
              style={styles.categoryModalPicker}
              selectedValue={this.state.categoryName}
              onValueChange={categoryName => {
                this._onCategoryChange(categoryName)
              }}
            >
              {this._getCategoryItems()}
            </Picker>

            <LTConfirm
              onPressLeft={this._onCategoryConfirm} 
              onPressRight={this._onCategoryCancel}
            />
          </LTModal>

          <LTModal
            style={styles.settingsModalContainer}
            show={this.state.settingsModalShow}
            onPressBackdrop={this._onSettingCancel}
          >
            <Text style={styles.settingsModalTitle}>
              {this.state.settingName}
            </Text>

            <Picker
              selectedValue={this.state.settingValue}
              onValueChange={value => this._onSettingChange(value)}
              style={styles.settingsModalPicker}
            >
              {this._getSettingRange(1, 40)}
            </Picker>

            <LTConfirm
              onPressLeft={this._onSettingConfirm} 
              onPressRight={this._onSettingCancel}
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