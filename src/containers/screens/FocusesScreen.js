import React from 'react';
import { connect } from 'react-redux';
import { setId } from '../../actions/FocusActions';

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

  _selectFocus = id => {
    this.props.setId(id);
    this.props.navigation.navigate('Focus');
  };

  _getSectionData = () => {
    if (this.props.categories.types === undefined) {
      return [];
    }

    let sectionData = [];
    let focusArray = Object.values(this.props.focuses);
    
    this.props.categories.types.forEach(title => {
      const data = focusArray.filter(focus => {
        return focus.category === title;
      }).sort((a, b) => {
        return a.name.localeCompare(b.name);
      });

      const section = {
        title,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusesScreen);