import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { auth } from '../../../config/firebaseConfig';
import { getToday } from '../../../utils';
import { UNCATEGORIZED } from '../../../constants/Categories';
import { SET_ID } from '../../../constants/Focus';
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
      userId: auth.currentUser.uid,
      name: this.state.newFocusName,
      category: this.state.categoryName,
      time: this.props.settings.workPeriod * 60,
      active: false,
      working: true,
      timer: null,
      periods: 0,
      level: 0,
      experience: 0.0,
      workPeriod: this.props.settings.workPeriod,
      workGoal: this.props.settings.workGoal,
      breakPeriod: this.props.settings.breakPeriod,
      history: { [getToday()]: 0 },
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
    this.props.setId(id);
    this.props.navigation.navigate('Focus');
  };

  _onCategoryValueChange = categoryName => {
    this.setState({
      categoryName,
    });
  };

  _getSectionData = () => {
    let categoryNames = Object.keys(this.props.categories);
    categoryNames.sort((a, b) => a.localeCompare(b));
    categoryNames = categoryNames.filter(categoryName => {
      return categoryName !== UNCATEGORIZED;
    });
    categoryNames.push(UNCATEGORIZED);

    const sectionData = categoryNames.map(categoryName => {
      let data = [];
      const category = this.props.categories[categoryName];

      if (category.show) {
        for (const id in this.props.focuses) {
          if (this.props.focuses[id].category === categoryName) {
            data.push({ id, ...this.props.focuses[id] });
          }
        }

        data.sort((a, b) => a.name.localeCompare(b.name));
      }

      return {
        title: categoryName,
        show: category.show,
        data,
      };
    });

    const uncategorizedIndex = sectionData.findIndex(categoryData => {
      const isUncategorized = categoryData.title === UNCATEGORIZED;
      const hasNoData = categoryData.data.length === 0;

      return isUncategorized && hasNoData;
    });

    if (uncategorizedIndex !== -1) {
      sectionData.splice(uncategorizedIndex, 1);
    }

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
  categories: state.categories,
  focus: state.focus,
  focuses: state.focuses,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setId: id => dispatch({ type: SET_ID, id }),
  addFocus: focus => addFocus(dispatch, focus), 
  updateCategory: (name, update) => updateCategory(dispatch, name, update),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusesScreen);