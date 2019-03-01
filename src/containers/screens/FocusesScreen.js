import React from 'react';
import { connect } from 'react-redux';
import { setId } from '../../actions/FocusActions';
import { toggleCategoryShow } from '../../actions/CategoriesActions';

import LTIcon from '../../components/LTIcon';
import FocusList from '../../components/FocusList';

class FocusesScreen extends React.Component {

  static navigationOptions = ({ navigation }) => ({
    title: 'Focuses',
    headerRight: (
      <LTIcon
        type='ios-add'
        size={42}
        onPress={() => navigation.navigate('FocusAdd')}
      />
    ),
  });

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
        show: category.show,
        data,
      };

      sectionData.push(section);
    });

    return sectionData;
  };

  render() {
    return (
      <FocusList
        sections={this._getSectionData()}
        selectCategory={this._selectCategory}
        selectFocus={this._selectFocus}
      />
    );
  };
};

const mapStateToProps = state => ({
  focuses: state.focuses,
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  setId: id => dispatch(setId(id)),
  toggleCategoryShow: name => dispatch(toggleCategoryShow(name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusesScreen);