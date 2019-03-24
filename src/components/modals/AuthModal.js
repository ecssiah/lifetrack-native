import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../config/firebaseConfig';
import firebase from 'firebase';
import { Alert, TextInput } from 'react-native';
import createStyles, { FontSize, Font } from '../../styles';

import LTText from '../LT/LTText';
import LTModal from '../LT/LTModal';
import LTSpacer from '../LT/LTSpacer';
import LTConfirm from '../LT/LTConfirm';

const styles = createStyles({
  container: {
    height: 246,
  },
  message: {
    fontSize: 18,
    marginHorizontal: 6,
    textAlign: 'center',
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

class AuthModal extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      password: ''
    };
  };

  _onReauthorizationAttempt = async () => {
    try {
      const user = auth.currentUser;

      const credential = firebase.auth.EmailAuthProvider.credential(
        user.email,
        this.state.password
      );

      await user.reauthenticateAndRetrieveDataWithCredential(credential);

      this.props.onConfirm();
    }
    catch (error) {
      this.setState({
        password: '',
      });

      Alert.alert(
        'Password incorrect. Try again.',
        '',
        [
          { text: 'Confirm', onPress: null },
        ],
      );
    }
  };

  render() {
    return (
      <LTModal
        style={styles.container}
        show={this.props.show}
        onPressBackdrop={this.props.onCancel}
      >
        <LTSpacer large />

        <LTText style={styles.message}>
          {this.props.message}
        </LTText>

        <TextInput
          style={styles.passwordInput}
          value={this.state.password} 
          placeholder={'password'}
          secureTextEntry={true}
          textAlign='center'
          autoCapitalize='none'
          keyboardAppearance='dark'
          onChangeText={password => this.setState({ password })}
        />

        <LTSpacer medium />

        <LTConfirm
          onPressLeft={this.props.onCancel} 
          onPressRight={this._onReauthorizationAttempt}
        />
      </LTModal>
    );
  };
};

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(AuthModal);