import React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import styles from './style';
import { firebaseApp } from '../../config';

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  onPressSignUp = () => {
    firebaseApp.auth().createUserWithEmailAndPassword(
      this.state.email, this.state.password
    ).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("error " + errorCode + ": " + errorMessage);
    });

    this.setState({
      email: '',
      password: '',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.section}
        >
          Email
        </Text>

        <TextInput
          style={{height: 40, width: 120, borderColor: 'gray', borderWidth: 1}}
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />

        <Text
          style={styles.section}
        >
          Password
        </Text>

        <TextInput
          secureTextEntry={true}
          style={{height: 40, width: 120, borderColor: 'gray', borderWidth: 1}}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />

        <Button
          onPress={this.onPressSignUp}
          title="Sign Up"
          color="#841584"
        />
      </View>
    );
  }
}

export default SignUpScreen;