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
  constructor(props) {
    super(props)

    this.state = {
      authModalShow: false,
      email: props.user.email,
      birthYear: props.user.birthYear,
    }
  }

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

  _onBirthYearChange = birthYear => {
    this.setState({
      birthYear,
    })
  }

  _onBirthYearSubmit = async () => {
    if (isNaN(this.state.birthYear)) {
      this.props.updateUser({ birthYear: 'None' })
      this.setState({ birthYear: 'None' })
    } else {
      const currentYear = new Date().getFullYear()
      const birthYearCandidate = parseInt(this.state.birthYear)

      if (birthYearCandidate > 1890 && birthYearCandidate <= currentYear) {
        this.props.updateUser({ birthYear: this.state.birthYear })
      } else {
        this.props.updateUser({ birthYear: 'None' })
        this.setState({ birthYear: 'None' })
      }
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

        <View style={styles.profileItem}>
          <LTText style={styles.profileText} >
            Birth Year:
          </LTText>

          <TextInput
            style={styles.profileInput}
            value={formatSpace(this.state.birthYear)}
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