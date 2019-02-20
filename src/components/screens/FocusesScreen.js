import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { auth, db } from '../../config';

import FocusList from '../FocusList';

class FocusesScreen extends React.Component {
  constructor(props) {
    super(props);

    props.navigation.addListener('willFocus', this._loadFocuses);

    this.state = {
      focuses: [],
    };
  };

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

  _loadFocuses = () => {
    let focuses = [];

    db.collection('focuses').where(
      'userId', '==', auth.currentUser.uid
    ).get(
    ).then(snapshot => {
      snapshot.forEach(doc => {
        focuses.push({
          id: doc.id,
          userId: doc.get('userId'),
          name: doc.get('name'),
          category: doc.get('category'),
          level: doc.get('level'),
          experience: doc.get('experience'),
        });

        this.setState({
          focuses,
        });
      });
    }).catch(err => {
      console.error(err);
    });
  };

  _selectFocus = id => {
    this.props.navigation.navigate('Focus');
  };

  render() {
    return (
      <FocusList
        focuses={this.state.focuses}
        selectFocus={this._selectFocus}
      />
    );
  }
}

export default FocusesScreen;