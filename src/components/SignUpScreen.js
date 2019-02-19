import React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import { auth, db } from '../config';
import createStyles from '../styles';

const styles = createStyles();

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  _onPressSignUp = () => {
    auth.createUserWithEmailAndPassword(
      this.state.email, this.state.password
    ).then(cred => {
      db.collection('users').doc(cred.user.uid).set({
        user: cred.user.email,
      });
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.warn("error " + errorCode + ": " + errorMessage);
    });

    this.setState({
      password: '',
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

        <Button
          onPress={this._onPressSignUp}
          title="Sign Up"
          color="#841584"
        />
      </View>
    );
  }
}

export default SignUpScreen;