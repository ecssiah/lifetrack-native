import React from 'react';
import { connect } from 'react-redux';
import { TextInput, View } from 'react-native';
import createStyles, { FontSize } from '../../../styles';
import LTText from '../../../components/LT/LTText';
import LTIcon from '../../../components/LT/LTIcon';
import { updateUser, updateUserEmail } from '../../../handlers/UserHandlers';
import AuthModal from '../../../components/modals/AuthModal';

const styles = createStyles({
  container: {
    flex: 1,
    padding: 42, 
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  profileItem: {
    flexDirection: 'row',
  },
  profileText: {
    flex: 1,
    fontSize: 18,
  },
  profileInput: {
    flex: 1,
    fontSize: 18,
    textAlign: 'right',
  },
});

class ProfileScreen extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      authModalShow: false,
      email: props.user.email,
      birthYear: props.user.birthYear,
    };
  };

  static navigationOptions = ({navigation}) => ({
    title: 'Profile',
    headerLeft: (
      <LTIcon
        type='ios-arrow-back'
        size={32}
        onPress={() => navigation.goBack()}
      />
    ),
  });

  _onEmailChange = email => {
    this.setState({
      email,
    });
  };

  _onEmailSubmit = async () => {
    this.setState({
      authModalShow: true,
    });
  };

  _onBirthYearChange = birthYear => {
    this.setState({
      birthYear,
    });
  };

  _onBirthYearSubmit = async () => {
    this.props.updateUser({ birthYear: this.state.birthYear });
  };

  _onAuthConfirm = async () => {
    await this.props.updateUserEmail(this.state.email); 

    this.setState({
      authModalShow: false,
    });
  };

  _onAuthCancel = () => {
    this.setState({
      authModalShow: false,
      email: this.props.user.email, 
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileItem}>
          <LTText style={styles.profileText} >
            Email:
          </LTText>

          <TextInput
            style={styles.profileInput}
            value={this.state.email}
            onChangeText={this._onEmailChange} 
            onSubmitEditing={this._onEmailSubmit}
          />
        </View>

        <View style={styles.profileItem}>
          <LTText style={styles.profileText} >
            Birth Year:
          </LTText>

          <TextInput
            style={styles.profileInput}
            value={this.state.birthYear.toString()}
            onChangeText={this._onBirthYearChange} 
            onSubmitEditing={this._onBirthYearSubmit}
          /> 
        </View>

        <AuthModal
          message={'Changing account email requires authentication.'}
          show={this.state.authModalShow}
          onConfirm={this._onAuthConfirm}
          onCancel={this._onAuthCancel} 
        />
      </View>
    );
  };
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  updateUser: update => updateUser(dispatch, update),
  updateUserEmail: email => updateUserEmail(dispatch, email),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);