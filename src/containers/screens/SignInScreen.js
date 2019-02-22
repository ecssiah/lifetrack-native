import React from 'react';
import { connect } from 'react-redux';
import { Button, View, Text, TextInput } from 'react-native';
import { auth, db } from '../../config';
import createStyles from '../../styles';
import { loadSettings } from '../../actions/SettingsActions';

const styles = createStyles();

class SignInScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  _onPressSignIn = () => {
    auth.signInWithEmailAndPassword(
      this.state.email, this.state.password
    ).then(cred => {
      db.collection('settings').where(
        'userId', '==', cred.user.uid
      ).get().then(snapshot => {
        let settings;

        snapshot.forEach(doc => {
          settings = {
            userId: doc.get('userId'),
            workGoal: doc.get('workGoal'),
            workPeriod: doc.get('workPeriod'),
            breakPeriod: doc.get('breakPeriod'),
          };
        });

        this.props.loadSettings(settings);
      }).catch(err => {
        console.error(err);
      });
    }).catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.warn("error " + errorCode + ": " + errorMessage);
    });

    this.setState({
      password: '',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.section} >
          Email
        </Text>

        <TextInput
          style={{height: 40, width: 240, borderColor: 'gray', borderWidth: 1}}
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />

        <Text style={styles.section} >
          Password
        </Text>

        <TextInput
          secureTextEntry={true}
          style={{height: 40, width: 240, borderColor: 'gray', borderWidth: 1}}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />

        <Button
          onPress={this._onPressSignIn}
          title="SignIn"
          color="#841584"
        />

        <Button
          onPress={ () => this.props.navigation.navigate('SignUp') }
          title="SignUp"
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);