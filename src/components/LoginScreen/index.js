import React from 'react';
import { Button, View, Text, TextInput } from 'react-native';
import styles from './style';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  onPressLogin = () => {
    this.setState({
      username: 'Testing',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={styles.section}
        >
          Username
        </Text>

        <TextInput
          style={{height: 40, width: 120, borderColor: 'gray', borderWidth: 1}}
          onChangeText={username => this.setState({username})}
          value={this.state.username}
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
          onPress={this.onPressLogin}
          title="Login"
          color="#841584"
        />
      </View>
    );
  }
}

export default LoginScreen;