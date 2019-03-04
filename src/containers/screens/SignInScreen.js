import React from 'react';
import { connect } from 'react-redux';
import { Button, View, TextInput } from 'react-native';
import { auth, db } from '../../config';
import createStyles, { FontSize } from '../../styles';
import { setSettings } from '../../actions/SettingsActions';
import { setCategories } from '../../actions/CategoriesActions';

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

  _onPressSignIn = () => {
    auth.signInWithEmailAndPassword(
      this.state.email, this.state.password
    ).then(cred => {
      const settingsPromise = db.collection('settings').doc(cred.user.uid).get();
      const categoriesPromise = db.collection('categories').doc(cred.user.uid).get();

      Promise.all([
        settingsPromise,
        categoriesPromise, 
      ]).then(values => {
        const settingsDoc = values[0];
        const categoriesDoc = values[1];

        const settings = {
          workPeriod: settingsDoc.get('workPeriod'),
          workGoal: settingsDoc.get('workGoal'),
          breakPeriod: settingsDoc.get('breakPeriod'),
        };
        this.props.setSettings(settings);

        const categories = categoriesDoc.get('list');
        this.props.setCategories(categories);
      }).catch(err => {
        console.error(err);
      });
    }).catch(err => {
      const errorCode = err.code;
      const errorMessage = err.message;

      console.warn(errorCode + ": " + errorMessage);
    });

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

});

const mapDispatchToProps = dispatch => ({
  setSettings: settings => dispatch(setSettings(settings)), 
  setCategories: categories => dispatch(setCategories(categories)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);