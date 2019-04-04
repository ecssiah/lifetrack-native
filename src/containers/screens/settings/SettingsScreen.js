import React from 'react'
import { connect } from 'react-redux'
import { Alert, TouchableOpacity, View } from 'react-native'
import { 
  WORK_PERIOD, WORK_GOAL, BREAK_PERIOD,
} from '../../../constants/Focuses'
import { signOut } from '../../../handlers/AuthHandlers'
import { updateSettings } from '../../../handlers/SettingsHandlers'
import createStyles, { Color, FontSize } from '../../../styles' 

import LTText from '../../../components/LT/LTText'
import SettingList from '../../../components/setting/SettingList'
import SettingsModal from '../../../components/modals/SettingsModal'

const styles = createStyles({
  container: {
    flex: 1,
  },
  userProfile: {
    fontSize: FontSize.modalTitle,
    color: Color.highlight,
    textAlign: 'center',
    margin: 8,
  },
  logout: {
    fontSize: FontSize.subtitle,
    fontWeight: 'bold',
    color: Color.highlight,
    textAlign: 'center',
    margin: 8,
  },
})

class SettingsScreen extends React.Component 
{
  constructor(props) {
    super(props)

    this.state = {
      settingName: '',
      settingValue: '',
      settingsModalShow: false,
    }
  }

  static navigationOptions = {
    title: 'Settings',
  }

  _onSettingValueChange = settingValue => {
    this.setState({
      settingValue,
    })
  }

  _onSettingSelect = settingName => {
    let settingValue

    switch (settingName) {
      case 'Categories': {
        this.props.navigation.navigate('Categories')
        return
      }
      case WORK_PERIOD: {
        settingValue = this.props.settings.workPeriod.toString()
        break
      }
      case BREAK_PERIOD: {
        settingValue = this.props.settings.breakPeriod.toString()
        break
      }
      case WORK_GOAL: {
        settingValue = this.props.settings.workGoal.toString()
        break
      }
      default: {
        console.error('Invalid setting: ' + settingName)
      }
    }

    this.setState({
      settingName,
      settingValue,
      settingsModalShow: true,
    })
  }

  _onSettingConfirm = () => {
    const update = {}

    switch (this.state.settingName) {
      case WORK_PERIOD: {
        update.workPeriod = parseInt(this.state.settingValue)
        break
      }
      case BREAK_PERIOD: {
        update.breakPeriod = parseInt(this.state.settingValue)
        break
      }
      case WORK_GOAL: {
        update.workGoal = parseInt(this.state.settingValue)
        break
      }
      default: {
        console.error('Invalid setting: ' + settingName)
      }
    }

    this.props.updateSettings(update)

    this.setState({
      settingsModalShow: false,
    })
  }

  _onSettingCancel = () => {
    this.setState({
      settingsModalShow: false,
    })
  }

  _onLogout = () => {
    Alert.alert(
      'Do you want to logout?',
      '',
      [
        { text: 'Cancel', onPress: null },
        { text: 'Confirm', onPress: this._onLogoutConfirm },
      ],
    )
  }

  _onLogoutConfirm = async () => {
    for (const key in this.props.focuses) {
      clearInterval(this.props.focuses[key].timer)
    }

    this.props.signOut()
  }

  _renderLogout = ({item, index}) => {
    if (!item) return null

    return (
      <TouchableOpacity 
        key={index} 
        onPress={this._onLogout}
      >
        <LTText style={styles.logout}>
          {item.name}
        </LTText>
      </TouchableOpacity> 
    )
  }

  _renderUsername = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => this.props.navigation.navigate('Profile')}
      >
        <LTText style={styles.userProfile}>
          {item.name}
        </LTText>
      </TouchableOpacity>
    )
  }

  _getSections = () => {
    return [
      {
        title: 'Profile',
        data: [
          { name: this.props.user.email, value: ''},
        ], 
        renderItem: this._renderUsername,
      },
      {
        title: 'General',
        data: [ 
          { name: WORK_PERIOD, value: this.props.settings.workPeriod },
          { name: BREAK_PERIOD, value: this.props.settings.breakPeriod },
          { name: WORK_GOAL, value: this.props.settings.workGoal },
        ],
      },
      {
        title: '',
        data: [
          { name: 'Categories', value: '>'},
        ],
      },
      {
        title: '',
        data: [
          { name: 'Logout', value: ''},
        ], 
        renderItem: this._renderLogout,
      },
      {
        title: '',
        data: [],
      },
    ]
  }

  render() {
    return (
      <View style={styles.container}>
        <SettingList
          sections={this._getSections()} 
          onSettingSelect={this._onSettingSelect}
        />
        
        <SettingsModal
          show={this.state.settingsModalShow}
          settingName={this.state.settingName}
          settingValue={this.state.settingValue}
          onConfirm={this._onSettingConfirm} 
          onCancel={this._onSettingCancel}
          onSettingValueChange={value => this._onSettingValueChange(value)}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  selection: state.selection,
  focuses: state.focuses,
  settings: state.settings,
})

const mapDispatchToProps = dispatch => ({
  signOut: () => signOut(dispatch),
  updateSettings: update => updateSettings(dispatch, update),
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)