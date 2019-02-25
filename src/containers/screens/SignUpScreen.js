import React from 'react';
import { connect } from 'react-redux';
import { Button, View, Text, TextInput } from 'react-native';
import { auth, db } from '../../config';
import createStyles from '../../styles';
import { loadSettings } from '../../actions/SettingsActions';
import { 
  DEFAULT_WORK_PERIOD, DEFAULT_WORK_GOAL, DEFAULT_BREAK_PERIOD 
} from '../../constants/Focus';

const styles = createStyles({
  signUpContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '8%',
  },
  signUpInput: {
    width: 240, 
    height: 40, 
    borderWidth: 1,
    borderColor: 'gray', 
  },
});

class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirm: '',
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Sign Up',
  });

  _onPressSignUp = () => {
    if (this.state.password === this.state.confirm) {
      auth.createUserWithEmailAndPassword(
        this.state.email, this.state.password
      ).then(cred => {
        const settings = {
          userId: cred.user.uid,
          workPeriod: DEFAULT_WORK_PERIOD,
          workGoal: DEFAULT_WORK_GOAL,
          breakPeriod: DEFAULT_BREAK_PERIOD,
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
      <View style={styles.signUpContainer}>
        <Text style={styles.section}>
          Email
        </Text> 

        <TextInput
          style={styles.signUpInput}
          textAlign='center'
          keyboardType='email-address'
          keyboardAppearance='dark'
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />

        <Text style={styles.section}>
          Password
        </Text>

        <TextInput
          secureTextEntry={true}
          style={styles.signUpInput}
          textAlign='center'
          keyboardAppearance='dark'
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />

        <Text style={styles.section}>
          Confirm Password
        </Text>

        <TextInput
          secureTextEntry={true}
          style={styles.signUpInput}
          textAlign='center'
          keyboardAppearance='dark'
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