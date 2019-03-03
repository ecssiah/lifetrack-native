import React from 'react';
import { connect } from 'react-redux';
import { Button, View, Text, TextInput } from 'react-native';
import { auth, db } from '../../config';
import createStyles from '../../styles';
import { setSettings } from '../../actions/SettingsActions';
import { setCategories } from '../../actions/CategoriesActions';

const styles = createStyles({
  signInContainer: {
    flex: 1,
    alignItems: 'center',
  },
  signInInput: {
    width: 240, 
    height: 40, 
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'gray', 
  },
});

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

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
  }

  render() {
    return (
      <View style={styles.signInContainer}>
        <Text style={styles.section} >
          Email
        </Text>

        <TextInput
          style={styles.signInInput}
          value={this.state.email}
          textAlign='center'
          keyboardType='email-address'
          keyboardAppearance='dark'
          onChangeText={email => this.setState({email})}
        />

        <Text style={styles.section} >
          Password
        </Text>

        <TextInput
          style={styles.signInInput}
          value={this.state.password}
          secureTextEntry={true}
          textAlign='center'
          keyboardAppearance='dark'
          onChangeText={password => this.setState({password})}
        />

        <Button
          onPress={this._onPressSignIn}
          title="Sign In"
          color="#841584"
        />

        <Button
          onPress={ () => this.props.navigation.navigate('SignUp') }
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
  setSettings: settings => dispatch(setSettings(settings)), 
  setCategories: categories => dispatch(setCategories(categories)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);