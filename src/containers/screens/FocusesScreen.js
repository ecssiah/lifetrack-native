import React from 'react';
import { Picker, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { setId } from '../../actions/FocusActions';
import { addFocus, setCategory } from '../../actions/FocusesActions';
import { addCategory, toggleCategoryShow } from '../../actions/CategoriesActions';
import firebase from 'firebase';
import { auth, db } from '../../config';
import createStyles from '../../styles';

import LTIcon from '../../components/LTIcon';
import LTModal from '../../components/LTModal';
import FocusList from '../../components/FocusList';

const styles = createStyles({
  addContainer: {
    flex: 1, 
  },  
  addModalContainer: {
    height: '56%',
    width: '86%',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  addNameModalInput: {
    width: 272,
    height: 40, 
    fontSize: 20, 
    fontWeight: 'bold',
    borderColor: 'black',
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
    margin: 8,
    paddingVertical: 9,
    paddingHorizontal: 10,
  },
  addCategoryModalInput: {
    width: 272,
    height: 40, 
    fontSize: 20, 
    fontWeight: 'bold',
    borderColor: 'black',
    color: 'black',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 6,
    margin: 8,
    paddingVertical: 9,
    paddingHorizontal: 10,
  },
  addCategoryModalPicker: {
    height: '70%',
    width: '80%',
    marginBottom: -58,
  },
  addFocusText: {
    fontSize: 22,
    color: 'blue',
  },
});

class FocusesScreen extends React.Component {
  constructor(props) {
    super(props);

    props.navigation.setParams({
      addModalShow: false,
    });

    this.state = {
      newFocus: '',
      newCategory: '',
      category: this.props.categories[0].name,
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Focuses',
    headerRight: (
      <LTIcon
        type='ios-add'
        size={42}
        onPress={() => navigation.setParams({addModalShow: true})}
      />
    ),
  });

  _onAddConfirm = () => {
    let categoryName;

    if (this.state.newCategory === '') {
      categoryName = this.state.category;
    } else {
      categoryName = this.state.newCategory;

      const category = {
        name: categoryName,
        show: true,
      };

      db.collection('categories').doc(auth.currentUser.uid).update({
        list: firebase.firestore.FieldValue.arrayUnion(category),
      }).catch(err => {
        console.error(err);
      });

      this.props.addCategory(category);
    }

    this._addFocus(categoryName);

    this.props.navigation.setParams({
      addModalShow: false,
    });

    this.setState({
      category: categoryName,
    });
  };

  _selectCategory = category => {
    this.props.toggleCategoryShow(category);
  };

  _selectFocus = id => {
    this.props.setId(id);
    this.props.navigation.navigate('Focus');
  };

  _getSectionData = () => {
    let sectionData = [];
    let focusArray = Object.values(this.props.focuses);

    this.props.categories.forEach(category => {
      let data = [];

      if (category.show) {
        data = focusArray.filter(focus => {
          return focus.category === category.name;
        }).sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }

      let section = {
        title: category.name,
        data,
        show: category.show,
      };

      sectionData.push(section);
    });

    return sectionData;
  };

  _addFocus = category => {
    const docRef = db.collection('focuses').doc();

    const focus = {
      id: docRef.id,
      userId: auth.currentUser.uid,
      name: this.state.newFocus,
      category: category,
      level: 0,
      experience: 0.0,
      time: this.props.settings.workPeriod,
      workPeriod: this.props.settings.workPeriod,
      periods: 0,
      workGoal: this.props.settings.workGoal,
      breakPeriod: this.props.settings.breakPeriod,
      working: true,
      timerActive: false,
      timer: null,
    };

    this.setState({
      newFocus: '',
      newCategory: '',
    });

    docRef.set(focus).then(doc => {
      this.props.addFocus(focus);
    }).catch(err => {
      console.error(err);
    });
  };

  _onAddCancel = () => {
    this.setState({
      newFocus: '',
      newCategory: '',
      category: this.props.categories[0].name,
    });

    this.props.navigation.setParams({
      addModalShow: false,
    });
  };

  _onCategoryChange = category => {
    this.setState({
      category,
    });
  };

  render() {
    return (
      <View style={styles.addContainer}>
        <FocusList
          sections={this._getSectionData()}
          selectCategory={this._selectCategory}
          selectFocus={this._selectFocus}
        />

        <LTModal
          style={styles.addModalContainer}
          show={this.props.navigation.getParam('addModalShow')} 
          onPressBackdrop={this._onAddCancel}
        >
          <TextInput
            style={styles.addNameModalInput}
            textAlign='center'
            keyboardAppearance='dark'
            maxLength={24}
            returnKeyType='done'
            onChangeText={newFocus => this.setState({newFocus})}
            value={this.state.newFocus}
            placeholder={'New Focus'}
          />

          <TextInput
            style={styles.addCategoryModalInput}
            textAlign='center'
            keyboardAppearance='dark'
            maxLength={24}
            returnKeyType='done'
            onChangeText={newCategory => this.setState({newCategory})}
            value={this.state.newCategory}
            placeholder={'New Category'}
          />

          <Picker
            style={styles.addCategoryModalPicker}
            selectedValue={this.state.category}
            onValueChange={value => this._onCategoryChange(value)}
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

          <TouchableOpacity
            onPress={this._onAddConfirm}
          >
            <Text style={styles.addFocusText}>
              Add Focus
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={this._onAddCancel}
          >
            <Text style={styles.addFocusText}>
              Cancel
            </Text>
          </TouchableOpacity>
        </LTModal>
      </View>
    );
  };
};

const mapStateToProps = state => ({
  focus: state.focus,
  focuses: state.focuses,
  categories: state.categories,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setId: id => dispatch(setId(id)),
  addFocus: focus => dispatch(addFocus(focus)), 
  addCategory: category => dispatch(addCategory(category)),
  setCategory: (id, category) => dispatch(setCategory(id, category)),
  toggleCategoryShow: name => dispatch(toggleCategoryShow(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusesScreen);