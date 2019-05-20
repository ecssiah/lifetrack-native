import React from 'react'
import { connect } from 'react-redux'
import { Alert, Button, View, TextInput } from 'react-native'
import { signIn } from '../../../handlers/AuthHandlers'
import createStyles, { FontSize } from '../../../styles'

import LTSpacer from '../../../components/LT/LTSpacer'

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
})

class SignInScreen extends React.Component 
{
  static navigationOptions = ({ navigation }) => ({
    title: 'LifeTrack',
  })


  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
    }
  }


  _onPressSignIn = async () => {
    try {
      await this.props.signIn(this.state.email, this.state.password)
    } catch (e) {
      Alert.alert(
        e.message,
        '',
        [
          { text: 'Confirm', onPress: null },
        ],
      )

      this.setState({
        password: '',
      })
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.emailInput}
          value={this.state.email}
          placeholder={'email'}
          textAlign='center'
          autoCapitalize='none'
          keyboardType='email-address'
          keyboardAppearance='dark'
          onChangeText={email => this.setState({email})}
        />

        <TextInput
          style={styles.passwordInput}
          value={this.state.password}
          placeholder={'password'}
          secureTextEntry={true}
          textAlign='center'
          autoCapitalize='none'
          keyboardAppearance='dark'
          onChangeText={password => this.setState({password})}
        />

        <LTSpacer />

        <Button
          title="Sign In"
          color="#841584"
          onPress={this._onPressSignIn}
        />

        <LTSpacer large />
        <LTSpacer large />

        <Button
          title="Register New Account"
          color="#841584"
          onPress={() => this.props.navigation.navigate('SignUp')} 
        />

      </View>
    )
  }
}


const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
  signIn: (email, password) => signIn(dispatch, email, password),
})


export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)