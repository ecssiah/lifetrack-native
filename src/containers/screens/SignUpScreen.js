import React from 'react';
import { connect } from 'react-redux';
import { Button, View, Text, TextInput } from 'react-native';
import { auth, db } from '../../config';
import createStyles from '../../styles';
import { loadSettings } from '../../actions/SettingsActions';

const styles = createStyles();

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirm: '',
    };
  }

  _onPressSignUp = () => {
    if (this.state.password === this.state.confirm) {
      auth.createUserWithEmailAndPassword(
        this.state.email, this.state.password
      ).then(cred => {
        const settings = {
          userId: cred.user.uid,
          workPeriod: 1,
          workGoal: 2,
          breakPeriod: 1,  
        };

        db.collection('settings').add(settings);

        this.props.loadSettings(settings);
      }).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.warn("error " + errorCode + ": " + errorMessage);
      });
    } else {
      console.warn("Password confirmation does not match");
    }

    this.setState({
      password: '',
      confirm: '',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.section}>
          Email
        </Text> 

        <TextInput
          style={{height: 40, width: 240, borderColor: 'gray', borderWidth: 1}}
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />

        <Text style={styles.section}>
          Password
        </Text>

        <TextInput
          secureTextEntry={true}
          style={{height: 40, width: 240, borderColor: 'gray', borderWidth: 1}}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />

        <Text style={styles.section}>
          Confirm Password
        </Text>

        <TextInput
          secureTextEntry={true}
          style={{height: 40, width: 240, borderColor: 'gray', borderWidth: 1}}
          onChangeText={confirm => this.setState({confirm})}
          value={this.state.confirm}
        />

        <Button
          onPress={this._onPressSignUp}
          title="Sign Up"
          color="#841584"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  loadSettings: settings => dispatch(loadSettings(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);