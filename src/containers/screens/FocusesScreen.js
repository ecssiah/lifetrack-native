import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { setID } from '../../actions/FocusActions';

import FocusList from '../../components/FocusList';

class FocusesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Focuses',
    headerRight: (
      <Icon
        name='ios-add' size={35} color='#ffffff' 
        onPress={ () => navigation.navigate('FocusAdd') }
        style={{ 
          paddingRight: 18, 
        }}
      />
    ),
  });

  _selectFocus = id => {
    this.props.setID(id);
    this.props.navigation.navigate('Focus');
  };

  render() {
    return (
      <FocusList
        focuses={this.props.focuses}
        selectFocus={this._selectFocus}
      />
    );
  }
}

const mapStateToProps = state => ({
  focuses: state.focuses,
});

const mapDispatchToProps = dispatch => ({
  setID: id => dispatch(setID(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusesScreen);