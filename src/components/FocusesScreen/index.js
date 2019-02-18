import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Text, View, FlatList, SectionList } from 'react-native';
import styles from './style';
import { auth, db } from '../../config';

import FocusItem from '../FocusItem';

class FocusesScreen extends React.Component {
  constructor(props) {
    super(props);

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

  loadFocuses = () => {
    let newFocuses = [];

    db.collection('focuses').where(
      'userId', '==', auth.currentUser.uid
    ).get(
    ).then(snapshot => {
      snapshot.forEach(doc => {
        newFocuses = newFocuses.concat({
          name: doc.get('name'),
          category: doc.get('category'),
          level: doc.get('level'),
          experience: doc.get('experience'),
          userId: doc.get('userId'),
        });

        this.setState({
          focuses: newFocuses,
        });
      });
    }).catch(err => {
      console.error(err);
    });
  };

  render() {
    return (
      <View style={styles.screen}>
        <Button
          title='Load Focuses'
          onPress={this.loadFocuses}
          color='#3467dd'
        />

        <FlatList
          data={this.state.focuses}
          keyExtractor={(item, index) => item.name + index}
          renderItem={({item}) => <FocusItem focus={item} />}
        />
      </View>
    );
  }
}

export default FocusesScreen;