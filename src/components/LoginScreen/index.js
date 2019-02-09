import React from 'react';
import { View, Text, TextInput } from 'react-native';
import styles from './style';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={{height: 40, width: 120, borderColor: 'gray', borderWidth: 1}}
          onChangeText={username => this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          secureTextEntry={true}
          style={{height: 40, width: 120, borderColor: 'gray', borderWidth: 1}}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />
      </View>
    );
  }
}

export default LoginScreen;