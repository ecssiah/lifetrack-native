import React from 'react';
import { connect } from 'react-redux';
import Ionicon from 'react-native-vector-icons/Ionicons';
import { setId } from '../../actions/FocusActions';

import FocusList from '../../components/FocusList';

class FocusesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Focuses',
    headerRight: (
      <Ionicon
        name='ios-add' size={38} color='#ffffff' 
        onPress={ () => navigation.navigate('FocusAdd') }
        style={{ 
          marginRight: 18, 
        }}
      />
    ),
  });

  _selectFocus = id => {
    this.props.setId(id);
    this.props.navigation.navigate('Focus');
  };

  _getSectionData = () => {
    if (this.props.categories.types) {
      let listData = [];
      let focusArray = Object.values(this.props.focuses);
      
      this.props.categories.types.forEach(category => {
        let data = focusArray.filter(focus => {
          return focus.category === category;
        });

        let section = {
          title: category,
          data: data,
        };

        listData.push(section);
      });

      return listData;
    }

    return [];
  };

  render() {
    return (
      <FocusList
        sections={this._getSectionData()}
        selectFocus={this._selectFocus}
      />
    );
  }
}

const mapStateToProps = state => ({
  focuses: state.focuses,
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  setId: id => dispatch(setId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusesScreen);