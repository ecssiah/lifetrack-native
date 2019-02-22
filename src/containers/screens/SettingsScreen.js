import React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button } from 'react-native';
import { auth } from '../../config';
import createStyles, { Fonts, Colors } from '../../styles'; 

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
      <View style={styles.container}>
        <Button
          onPress={this._logoutUser}
          title="Logout"
          color="#841584"
        />

        <Text>Work Period: {this.props.settings.workPeriod}</Text> 
        <Text>Work Goal: {this.props.settings.workGoal}</Text> 
        <Text>Break Period: {this.props.settings.breakPeriod}</Text> 
      </View>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);