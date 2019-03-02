import React from 'react';
import { connect } from 'react-redux';
import { Button, View, Text, TextInput } from 'react-native';
import { auth, db } from '../../config';
import createStyles from '../../styles';
import { setSettings } from '../../actions/SettingsActions';
import { setCategories } from '../../actions/CategoriesActions';
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
  setSettings: settings => dispatch(setSettings(settings)),
  setCategories: categories => dispatch(setCategories(categories)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);