import React from 'react';
import { View } from 'react-native';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { setId } from '../../../actions/FocusActions';
import { addFocus, setCategory } from '../../../actions/FocusesActions';
import { toggleCategoryShow } from '../../../actions/CategoriesActions';
import { firestoreConnect } from 'react-redux-firebase';
import firebase from '../../../config/fbConfig';
import createStyles from '../../../styles';

import LTIcon from '../../../components/LT/LTIcon';
import FocusList from '../../../components/focuses/FocusList';
import FocusAddModal from '../../../components/modals/FocusAddModal';

const styles = createStyles({
});

class FocusesScreen extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      newFocusName: '',
      categoryName: this.props.categories[0].name,
      addModalShow: false,
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Focuses',
    headerRight: (
      <LTIcon
        type='ios-add'
        size={42}
        onPress={() => navigation.state.params.addModalToggle()}
      />
    ),
  });

  componentDidMount() {
    this.props.navigation.setParams({
      addModalToggle: this._onAddModalToggle,
    });
  };

  _onAddModalToggle = () => {
    this.setState({
      addModalShow: !this.state.addModalShow,
    });
  };

  _addFocus = () => {
    const docRef = firebase.firestore().collection('focuses').doc();

    const focus = {
      id: docRef.id,
      userId: firebase.auth().currentUser.uid,
      name: this.state.newFocusName,
      category: this.state.categoryName,
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
    });

    docRef.set(focus).then(doc =>
      this.props.addFocus(focus)
    ).catch(err => 
      console.error(err)
    );
  };

  _onAddConfirm = () => {
    this._addFocus();

    this.setState({
      addModalShow: false,
      categoryName: this.state.categoryName,
    });
  };

  _onAddCancel = () => {
    this.setState({
      newFocusName: '',
      addModalShow: false,
      categoryName: this.props.categories[0].name,
    });
  };

  _onCategorySelect = categoryName => {
    const categories = this.props.categories.map(category => {
      if (category.name === categoryName) {
        return { ...category, show: !category.show };
      } else {
        return { ...category };
      }
    });

    firebase.firestore().collection('categories').doc(firebase.auth().currentUser.uid).update({
      list: categories,
    }).catch(error => {
      console.error(error);
    }); 

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
    let categories = [...this.props.categories];
    categories.sort((a, b) => a.name.localeCompare(b.name));

    const sectionData = categories.map(category => {
      let data = [];

      if (category.show) {
        const focusArray = Object.values(this.props.focuses);

        data = focusArray.filter(focus => focus.category === category.name);
        data.sort((a, b) => a.name.localeCompare(b.name));
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
          show={this.state.addModalShow}
          categoryName={this.state.categoryName}
          newFocusName={this.state.newFocusName}
          onConfirm={this._onAddConfirm}
          onCancel={this._onAddCancel}
          onFocusNameChange={text => this.setState({newFocusName: text})}
          onCategoryValueChange={value => this._onCategoryValueChange(value)}
        />
      </View>
    );
  };
};

const mapStateToProps = state => ({
  focus: state.focus,
  focuses: state.focuses,
  categories: state.firebase.ordered.categories,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setId: id => dispatch(setId(id)),
  addFocus: focus => dispatch(addFocus(focus)), 
  setCategory: (id, category) => dispatch(setCategory(id, category)),
  toggleCategoryShow: name => dispatch(toggleCategoryShow(name)),
});

export default compose(
  firestoreConnect(props => [
    { collection: 'categories', doc: props.firebase.auth.uid },
  ]),
  connect(mapStateToProps, mapDispatchToProps),
)(FocusesScreen);