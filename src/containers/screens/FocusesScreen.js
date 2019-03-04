import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { setId } from '../../actions/FocusActions';
import { addFocus, setCategory } from '../../actions/FocusesActions';
import { addCategory, toggleCategoryShow } from '../../actions/CategoriesActions';
import firebase from 'firebase';
import { auth, db } from '../../config';
import createStyles from '../../styles';

import LTIcon from '../../components/LT/LTIcon';

import FocusList from '../../components/focus/FocusList';
import FocusAddModal from '../../components/modals/FocusAddModal';

const styles = createStyles({
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

  _onCategoryValueChange = categoryName => {
    this.setState({
      categoryName,
    });
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

        <FocusAddModal
          categories={this.props.categories}
          show={this.props.navigation.getParam('addModalShow')}
          categoryName={this.state.categoryName}
          newFocusName={this.state.newFocusName}
          newCategoryName={this.state.newCategoryName}
          onConfirm={this._onAddConfirm}
          onCancel={this._onAddCancel}
          onFocusNameChange={text => this.setState({newFocusName: text})}
          onNewCategoryNameChange={text => this.setState({newCategoryName: text})}
          onCategoryValueChange={value => this._onCategoryValueChange(value)}
        />
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