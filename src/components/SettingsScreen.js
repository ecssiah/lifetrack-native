import React from 'react';
import { View, Text, Button } from 'react-native';
import { auth } from '../config';
import createStyles, { Fonts, Colors } from '../styles'; 

const styles = createStyles({
  section: {
    fontSize: Fonts.md,
    color: Colors.text,
  },
});

class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
  };

  _logoutUser = () => {
    auth.signOut().then(() => {
      this.props.navigation.navigate('Login');
    });
  }

  render() {
    return (
      <View style={styles.screen}>
        <Button
          onPress={this._logoutUser}
          title="Logout"
          color="#841584"
        />
      </View>
    );
  }
}

export default SettingsScreen;