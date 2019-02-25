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
  setId: id => dispatch(setId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusesScreen);