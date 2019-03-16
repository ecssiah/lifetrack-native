import React from 'react';
import { connect } from 'react-redux';
import { Alert, Button, View, TextInput } from 'react-native';
import createStyles, { FontSize } from '../../../styles';
import { signUpHandler } from '../../../handlers/AuthHandlers';

const styles = createStyles({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  emailInput: {
    width: '86%', 
    height: 40, 
    fontSize: FontSize.modalInput,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'gray', 
    marginTop: 14,
  },
  passwordInput: {
    width: '86%', 
    height: 40, 
    fontSize: FontSize.modalInput,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'gray', 
    marginTop: 14,
  },
  confirmInput: {
    width: '86%', 
    height: 40, 
    fontSize: FontSize.modalInput,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'gray', 
    marginTop: 14,
  },
});

class SignUpScreen extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirm: '',
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Sign Up',
  });

  _onPressSignUp = () => {
    if (this.state.password === this.state.confirm) {
      this.props.signUp(
        this.state.email,
        this.state.password,
      );
    } else {
      Alert.alert(
        'Password confirmation \ndoes not match.',
        '',
        [
          { text: 'Confirm', onPress: null },
        ],
      );
    }

    this.setState({
      password: '',
      confirm: '',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.emailInput}
          value={this.state.email}
          placeholder='email'
          textAlign='center'
          autoCapitalize='none'
          keyboardType='email-address'
          keyboardAppearance='dark'
          onChangeText={email => this.setState({email})}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.passwordInput}
          value={this.state.password}
          placeholder='password'
          textAlign='center'
          autoCapitalize='none'
          keyboardAppearance='dark'
          onChangeText={password => this.setState({password})}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.confirmInput}
          value={this.state.confirm}
          placeholder='confirm password'
          textAlign='center'
          autoCapitalize='none'
          keyboardAppearance='dark'
          onChangeText={confirm => this.setState({confirm})}
        />

        <Button
          onPress={this._onPressSignUp}
          title="Sign Up"
          color="#841584"
        />
      </View>
    );
  };
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  signUp: (email, password) => signUpHandler(dispatch, email, password),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);