import React from 'react';
import { View, Text, Button } from 'react-native';
import styles from './style';
import { auth } from '../../config';

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  logoutUser = () => {
    auth.signOut().then(() => {
      this.props.navigation.navigate('Login');
    });
  }

  render() {
    return (
      <View style={styles.screen}>
        <Button
          onPress={this.logoutUser}
          title="Logout"
          color="#841584"
        />
      </View>
    );
  }
}

export default SettingsScreen;