import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './style';
import { firebaseApp } from '../../config';

class SettingsScreen extends React.Component {

  logoutUser() {
    firebaseApp.auth().signOut();

    this.props.navigation.navigate('Login');
  }

  render() {
    return (
      <View style={styles.screen}>
        <Text style={styles.section}>Settings Screen</Text>

        <Button
          onPress={() => this.logoutUser() }
          title="Logout"
          color="#841584"
        />
      </View>
    );
  }
}

export default SettingsScreen;