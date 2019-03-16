import React from 'react';
import { connect } from 'react-redux';
import { Button, View, TextInput } from 'react-native';
import firebase from '../../../config/fbConfig';
import createStyles, { FontSize } from '../../../styles';
import { signIn } from '../../../actions/AuthActions';
import { setSettings } from '../../../actions/SettingsActions';
import { setCategories } from '../../../actions/CategoriesActions';

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
});

class SignInScreen extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Sign In',
  });

  _loadSettings = cred => {
    return firebase.firestore().collection('settings').doc(firebase.auth().currentUser.uid).get();
  };

  _loadCategories = cred => {
    return firebase.firestore().collection('categories').doc(firebase.auth().currentUser.uid).get();
  };

  _onPressSignIn = () => {
    this.props.signIn({
      email: this.state.email, 
      password: this.state.password,
    });

    // firebase.auth().signInWithEmailAndPassword(
    //   this.state.email, this.state.password
    // ).then(cred => {
    //   Promise.all([
    //     this._loadSettings(),
    //     this._loadCategories(),
    //   ]).then(values => {
    //     const settingsDoc = values[0];
    //     const categoriesDoc = values[1];

    //     this.props.setSettings(settingsDoc.data());
    //     this.props.setCategories(categoriesDoc.data().list);
    //   }).catch(error => {
    //     console.error(error);
    //   });
    // }).catch(error => {
    //   console.error(error);
    // });

    this.setState({
      password: '',
    });
  };

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

        <Button
          title="Sign In"
          color="#841584"
          onPress={this._onPressSignIn}
        />

        <Button
          title="Sign Up"
          color="#841584"
          onPress={ () => this.props.navigation.navigate('SignUp') }
        />
      </View>
    );
  };
};

const mapStateToProps = state => ({
  auth: state.firebase.auth,
});

const mapDispatchToProps = dispatch => ({
  signIn: cred => dispatch(signIn(cred)),
  setSettings: settings => dispatch(setSettings(settings)), 
  setCategories: categories => dispatch(setCategories(categories)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);