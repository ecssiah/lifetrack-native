import React from 'react';
import { connect } from 'react-redux';
import { Button, View, Text, TextInput } from 'react-native';
import { auth, db } from '../../config';
import createStyles, { FontSize } from '../../styles';
import { setSettings } from '../../actions/SettingsActions';
import { setCategories } from '../../actions/CategoriesActions';
import { 
  DEFAULT_WORK_PERIOD, DEFAULT_WORK_GOAL, DEFAULT_BREAK_PERIOD 
} from '../../constants/Focus';

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
          workPeriod: DEFAULT_WORK_PERIOD,
          workGoal: DEFAULT_WORK_GOAL,
          breakPeriod: DEFAULT_BREAK_PERIOD,
        };

        db.collection('settings').doc(cred.user.uid).set(settings);

        this.props.setSettings(settings);

        const categories = {
          list: [
            { name: 'Uncategorized', show: true },
          ],
        };

        db.collection('categories').doc(cred.user.uid).set(categories);

        this.props.setCategories(categories.list);

        // const stats = {
        //   today: {
        //     untracked: 12.4,
        //     focus1_ID: 8.2,
        //     focus2_ID: 2.3,
        //     focus3_ID: 0.0,
        //   },
        //   date1: {
        //     untracked: 12.4,
        //     focus1_ID: 8.2,
        //     focus2_ID: 2.3,
        //     focus3_ID: 0.0,
        //   },
        //   date2: {
        //     untracked: 12.4,
        //     focus1_ID: 8.2,
        //     focus2_ID: 2.3,
        //     focus3_ID: 0.0,
        //   },
        // };

        // db.collection('stats').doc(cred.user.uid).set(stats);

        // this.props.setStats(stats);
      }).catch(err => {
        const errorCode = err.code;
        const errorMessage = err.message;

        console.warn(errorCode + ": " + errorMessage);
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
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  setSettings: settings => dispatch(setSettings(settings)),
  setCategories: categories => dispatch(setCategories(categories)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);