import React from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

import { selectFocus } from '../../actions/SelectionActions';

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
    this.props.selectFocus(id);
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
  selectFocus: id => dispatch(selectFocus(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusesScreen);