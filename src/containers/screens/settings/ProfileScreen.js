import React from 'react'
import { connect } from 'react-redux'
import { TextInput, View } from 'react-native'
import { formatSpace } from '../../../../lib/utils'
import { updateUser, updateUserEmail } from '../../../handlers/UserHandlers'
import createStyles from '../../../styles'

import LTText from '../../../components/LT/LTText'
import LTIcon from '../../../components/LT/LTIcon'
import AuthModal from '../../../components/modals/AuthModal'

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
})

class ProfileScreen extends React.Component 
{
  static navigationOptions = ({navigation}) => ({
    title: 'Profile',
    headerLeft: (
      <LTIcon
        type='ios-arrow-back'
        size={32}
        onPress={() => navigation.goBack()}
      />
    ),
  })


  constructor(props) {
    super(props)

    this.state = {
      authModalShow: false,
      email: props.user.email,
    }
  }


  _onEmailChange = email => {
    this.setState({
      email,
    })
  }


  _onEmailSubmit = async () => {
    if (this.state.email !== this.props.user.email) {
      this.setState({
        authModalShow: true,
      })
    }
  }


  _onAuthConfirm = async () => {
    await this.props.updateUserEmail(this.state.email) 

    this.setState({
      authModalShow: false,
    })
  }


  _onAuthCancel = () => {
    this.setState({
      authModalShow: false,
      email: this.props.user.email, 
    })
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.profileItem}>
          <LTText style={styles.profileText} >
            Email:
          </LTText>

          <TextInput
            style={styles.profileInput}
            value={formatSpace(this.state.email)}
            onChangeText={this._onEmailChange} 
            onSubmitEditing={this._onEmailSubmit}
          />
        </View>

        <AuthModal
          message={'Changing account email requires authentication.'}
          show={this.state.authModalShow}
          onConfirm={this._onAuthConfirm}
          onCancel={this._onAuthCancel} 
        />
      </View>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
})


const mapDispatchToProps = dispatch => ({
  updateUser: update => updateUser(dispatch, update),
  updateUserEmail: email => updateUserEmail(dispatch, email),
})


export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)