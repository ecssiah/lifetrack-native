import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { auth } from '../../../config/firebaseConfig';
import { getToday } from '../../../utils';
import { UNCATEGORIZED } from '../../../constants/Categories';
import { UPDATE_SELECTION } from '../../../constants/Selection';
import { addFocus } from '../../../handlers/FocusesHandlers';
import { updateCategory } from '../../../handlers/CategoryHandlers';
import createStyles from '../../../styles';

import LTIcon from '../../../components/LT/LTIcon';
import FocusList from '../../../components/focuses/FocusList';
import FocusAddModal from '../../../components/modals/FocusAddModal';

const styles = createStyles({
  container: {
    flex: 1,
  },
});

class FocusesScreen extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      newFocusName: '',
      categoryName: UNCATEGORIZED,
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

  _onAddConfirm = () => {
    const focus = {
      name: this.state.newFocusName,
      category: this.state.categoryName,
      userId: auth.currentUser.uid,
      active: false,
      working: true,
      periods: 0,
      level: 0,
      experience: 0.0,
      timer: null,
      time: this.props.settings.workPeriod * 60,
      workPeriod: this.props.settings.workPeriod,
      workGoal: this.props.settings.workGoal,
      breakPeriod: this.props.settings.breakPeriod,
      history: { 
        [getToday()]: 0 
      },
    };

    this.props.addFocus(focus);

    this.setState({
      addModalShow: false,
      newFocusName: '',
      categoryName: this.state.categoryName,
    });
  };

  _onAddCancel = () => {
    this.setState({
      addModalShow: false,
      newFocusName: '',
      categoryName: UNCATEGORIZED,
    });
  };

  _onCategorySelect = categoryName => {
    const update = {
      show: !this.props.categories[categoryName].show,
    };

    this.props.updateCategory(categoryName, update);
  };

  _onFocusSelect = id => {
    this.props.updateSelection({ id });
    this.props.navigation.navigate('Focus');
  };

  _onCategoryValueChange = categoryName => {
    this.setState({
      categoryName,
    });
  };

  _findCategoryFocuses = name => {
    const focuses = [];

    for (const id in this.props.focuses) {
      if (this.props.focuses[id].category === name) {
        focuses.push({ id, ...this.props.focuses[id] });
      }
    }

    return focuses;
  };

  _sectionDataReducer = (result, name) => {
    const category = this.props.categories[name];
    const sectionData = { title: name, show: category.show, data: [] };

    if (name === UNCATEGORIZED) {
      const focuses = this._findCategoryFocuses(name);

      if (focuses.length > 0) {
        if (category.show) {
          focuses.sort((a, b) => a.name.localeCompare(b.name));
          result.push({ ...sectionData, data: focuses });
        } else {
          result.push(sectionData);
        }
      }
    } else {
      if (category.show) {
        const focuses = this._findCategoryFocuses(name);

        focuses.sort((a, b) => a.name.localeCompare(b.name));
        result.push({ ...sectionData, data: focuses });
      } else {
        result.push(sectionData);
      }
    }

    return result;
  };

  _getSectionData = () => {
    let categoryNames = Object.keys(this.props.categories);
    categoryNames = categoryNames.filter(name => name !== UNCATEGORIZED);
    categoryNames.sort((a, b) => a.localeCompare(b));
    categoryNames.push(UNCATEGORIZED);

    return categoryNames.reduce(this._sectionDataReducer, []);
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
  categories: state.categories,
  settings: state.settings,
  selection: state.selection,
  focuses: state.focuses,
});

const mapDispatchToProps = dispatch => ({
  addFocus: focus => addFocus(dispatch, focus), 
  updateSelection: update => dispatch({ type: UPDATE_SELECTION, update }),
  updateCategory: (name, update) => updateCategory(dispatch, name, update),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusesScreen);