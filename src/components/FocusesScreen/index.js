import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './style';
import { auth, db } from '../../config';
import { Colors } from '../../styles';

class FocusesScreen extends React.Component {
  static navigationOptions = {
    title: 'Focuses',
    // headerStyle: {
    //   backgroundColor: Colors.primary,
    // },
    // headerTintColor: 'white',
    // headerTitleStyle: {
    //   fontWeight: 'bold',
    // },
  };

  addFocus = () => {
    db.doc('focuses/focus1').set({
      name: 'Focus 1',
      category: 'Test Category 1',
      level: 1,
      experience: 22.2,
    }).then(() => {
      console.warn("First focus written");
    }).catch(err => {
      console.error(err);
    });

    db.doc('focuses/focus2').set({
      name: 'Focus 2',
      category: 'Test Category 2',
      level: 2,
      experience: 44.4,
    }).then(() => {
      console.warn("Second focus written");
    }).catch(err => {
      console.error(err);
    });

  };

  render() {
    return (
      <View style={styles.screen}>
        <Button
          onPress={this.addFocus}
          title="Add Focus"
          color="#841584"
        />
      </View>
    );
  }
}

export default FocusesScreen;