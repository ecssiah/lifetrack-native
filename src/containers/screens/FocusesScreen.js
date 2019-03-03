import React from 'react';
import { Picker, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { connect } from 'react-redux';
import { setId } from '../../actions/FocusActions';
import { addFocus, setCategory } from '../../actions/FocusesActions';
import { addCategory, toggleCategoryShow } from '../../actions/CategoriesActions';
import firebase from 'firebase';
import { auth, db } from '../../config';
import createStyles, { Color, FontSize } from '../../styles';

import LTIcon from '../../components/LTIcon';
import LTModal from '../../components/LTModal';
import LTConfirm from '../../components/LTConfirm';
import FocusList from '../../components/FocusList';

const styles = createStyles({
  addModalContainer: {
    height: '94%',
  },
  addNameModalInput: {
    width: '86%',
    height: 40, 
    fontSize: FontSize.modalInput, 
    color: 'black',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingVertical: 9,
    paddingHorizontal: 10,
    marginTop: 14,
  },
  addCategoryModalInput: {
    width: '86%',
    height: 40, 
    fontSize: FontSize.modalInput, 
    color: 'black',
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'black',
    backgroundColor: 'white',
    paddingVertical: 9,
    paddingHorizontal: 10,
    marginBottom: 4,
  },
  addCategoryModalPicker: {
    width: '86%',
  },
});

class FocusesScreen extends React.Component {
  constructor(props) {
    super(props);

    props.navigation.setParams({
      addModalShow: false,
    });

    this.state = {
      newFocusName: '',
      newCategoryName: '',
      categoryName: this.props.categories[0].name,
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

  _addFocus = categoryName => {
    const docRef = db.collection('focuses').doc();

    const focus = {
      id: docRef.id,
      userId: auth.currentUser.uid,
      name: this.state.newFocusName,
      category: categoryName,
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
      newFocusName: '',
      newCategoryName: '',
    });

    docRef.set(focus).then(doc =>
      this.props.addFocus(focus)
    ).catch(err => 
      console.error(err)
    );
  };

  _onAddConfirm = () => {
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
      }).catch(err => 
        console.error(err)
      );

      this.props.addCategory(categoryName);
    }

    this._addFocus(categoryName);

    this.props.navigation.setParams({
      addModalShow: false,
    });

    this.setState({
      categoryName: categoryName,
    });
  };

  _onAddCancel = () => {
    this.setState({
      newFocusName: '',
      newCategoryName: '',
      categoryName: this.props.categories[0].name,
    });

    this.props.navigation.setParams({
      addModalShow: false,
    });
  };

  _onCategorySelect = categoryName => {
    this.props.toggleCategoryShow(categoryName);
  };

  _onFocusSelect = id => {
    this.props.setId(id);
    this.props.navigation.navigate('Focus');
  };

  _onCategoryChange = categoryName => {
    this.setState({
      categoryName,
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

  _getSectionData = () => {
    let focusArray = Object.values(this.props.focuses);

    const sectionData = this.props.categories.map(category => {
      let data = [];

      if (category.show) {
        data = focusArray.filter(focus => focus.category === category.name);
        data = data.sort((a, b) => a.name.localeCompare(b.name));
      }

      return {
        title: category.name,
        show: category.show,
        data,
      };
    });

    return sectionData;
  };

  render() {
    return (
      <View style={styles.container}>
        <FocusList
          sections={this._getSectionData()}
          onCategorySelect={this._onCategorySelect}
          onFocusSelect={this._onFocusSelect}
        />

        <LTModal
          style={styles.addModalContainer}
          show={this.props.navigation.getParam('addModalShow')} 
          onPressBackdrop={this._onAddCancel}
        >
          <TextInput
            style={styles.addNameModalInput}
            value={this.state.newFocusName}
            placeholder={'New Focus'}
            textAlign='center'
            maxLength={24}
            returnKeyType='done'
            keyboardAppearance='dark'
            onChangeText={newFocusName => this.setState({newFocusName})}
          />

          <TextInput
            style={styles.addCategoryModalInput}
            value={this.state.newCategoryName}
            placeholder={'New Category'}
            textAlign='center'
            maxLength={24}
            returnKeyType='done'
            keyboardAppearance='dark'
            onChangeText={newCategoryName => this.setState({newCategoryName})}
          />

          <Picker
            style={styles.addCategoryModalPicker}
            selectedValue={this.state.categoryName}
            onValueChange={value => this._onCategoryChange(value)}
          >
            {this._getCategoryItems()}
          </Picker>

          <LTConfirm
            onPressLeft={this._onAddConfirm}
            onPressRight={this._onAddCancel}
          />
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