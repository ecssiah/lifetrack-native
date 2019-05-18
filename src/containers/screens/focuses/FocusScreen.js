import React from 'react'
import { getDay } from '../../../../lib/utils'
import { connect } from 'react-redux'
import { View } from 'react-native'
import Sound from 'react-native-sound'
import { 
  EXP_PER_SECOND, 
  CLOCK_INTERVAL,
  SAVE_INTERVAL, 
} from '../../../constants/Focuses'
import { updateFocus, updateFocusLocal } from '../../../handlers/FocusesHandlers'
import createStyles from '../../../styles'

import LTIcon from '../../../components/LT/LTIcon'
import FocusTitle from '../../../components/focuses/FocusTitle'
import FocusTimer from '../../../components/focuses/FocusTimer'
import FocusGoal from '../../../components/focuses/FocusGoal'
import FocusExperience from '../../../components/focuses/FocusExperience'

const styles = createStyles({ 
  container: {
    flex: 1,
    alignItems: 'center',
  },
})

class FocusScreen extends React.Component 
{
  static navigationOptions = ({ navigation }) => ({
    title: 'Focus',
    headerLeft: (
      <LTIcon
        type='ios-arrow-back'
        size={32}
        onPress={() => navigation.goBack()}
      />
    ),
    headerRight: (
      <LTIcon
        type='md-create'
        size={26}
        onPress={() => navigation.navigate('FocusEdit')}
      />
    ),
  })


  constructor(props) {
    super(props)

    this.state = {
      saveTimer: SAVE_INTERVAL,
      intervalBegin: undefined,
      sounds: undefined,
    }
  }

  componentDidMount() {
    this.setState({
      sounds: {
        done: new Sound('done.mp3', Sound.MAIN_BUNDLE)
      },
    })
  }


  componentWillUnmount() {
    for (const key in this.state.sounds) {
      this.state.sounds[key].release()
    }
  }


  _onGoalPress = () => {
    const update = { periods: 0 }

    this.props.updateFocus(this.props.selection.id, update)
    this.props.updateFocusLocal(this.props.selection.id, update)
  }


  _onActivate = () => {
    const update = {}
    const focus = this.props.focuses[this.props.selection.id]

    if (focus.active) {
      clearInterval(focus.timer)

      if (focus.working) {
        update.active = false
      } else {
        this.setState({ intervalBegin: new Date().getTime() })

        update.working = true
        update.time = focus.workPeriod * 60
        update.timer = setInterval(this._updateTimer, CLOCK_INTERVAL)
      }
    } else {
      this.setState({ intervalBegin: new Date().getTime() })

      update.timer = setInterval(this._updateTimer, CLOCK_INTERVAL)

      if (focus.working) {
        update.active = true
      } 
    }

    this.props.updateFocus(this.props.selection.id, update) 
    this.props.updateFocusLocal(this.props.selection.id, update)
  }


  _getTimerInterval = () => {
    const intervalEnd = new Date().getTime()
    const elapsed = (intervalEnd - this.state.intervalBegin) / 1000

    this.setState({ intervalBegin: intervalEnd })

    return elapsed
  }


  _tickFocus = focus => {
    const timerInterval = this._getTimerInterval()

    const update = {}
    update.time = focus.time - timerInterval
    
    if (focus.working) {
      const today = getDay().toLocaleDateString(
        undefined, { 'month': 'numeric', 'day': 'numeric', 'year': 'numeric' }
      )

      update.history = { ...focus.history }

      if (focus.history[today]) {
        update.history[today] = focus.history[today] + timerInterval
      } else {
        update.history[today] = timerInterval
      }

      update.experience = focus.experience + timerInterval * EXP_PER_SECOND

      if (update.experience >= 100) {
        update.experience -= 100
        update.level = focus.level + 1

        this.props.updateFocusLocal(this.props.selection.id, update)
      }
    }

    this.props.updateFocus(this.props.selection.id, update)

    if (this.state.saveTimer <= 0) {
      this.setState({
        saveTimer: SAVE_INTERVAL,
      })

      this.props.updateFocusLocal(this.props.selection.id, update)
    } else {
      this.setState({
        saveTimer: this.state.saveTimer - timerInterval,
      })
    }
  }


  _resetFocus = focus => {
    const update = {}
    this.state.sounds.done.play()

    if (focus.working) {
      update.working = false
      update.periods = focus.periods + 1
      update.time = 60 * focus.breakPeriod
    } else {
      update.working = true
      update.time = 60 * focus.workPeriod
    }

    this.props.updateFocus(this.props.selection.id, update)
    this.props.updateFocusLocal(this.props.selection.id, update)
  }


  _updateTimer = () => {
    const focus = this.props.focuses[this.props.selection.id]

    if (focus.time > 0) {
      this._tickFocus(focus)
    } else {
      this._resetFocus(focus)
    }
  }


  render() {
    const focus = this.props.focuses[this.props.selection.id]

    if (!focus) return null

    return (
      <View style={styles.container}>
        <FocusTitle 
          name={focus.name} 
        />
        <FocusTimer 
          active={focus.active}
          working={focus.working} 
          time={focus.time} 
          onActivate={this._onActivate}
        />
        <FocusGoal 
          periods={focus.periods} 
          goal={focus.workGoal} 
          onGoalPress={this._onGoalPress}
        />
        <FocusExperience 
          level={focus.level}
          experience={focus.experience} 
        />
      </View>
    )
  }
}


const mapStateToProps = state => ({
  status: state.status,
  user: state.user,
  settings: state.settings,
  selection: state.selection,
  focuses: state.focuses,
})


const mapDispatchToProps = dispatch => ({
  updateFocus: (id, update) => updateFocus(dispatch, id, update),
  updateFocusLocal: (id, update) => updateFocusLocal(id, update),
})


export default connect(mapStateToProps, mapDispatchToProps)(FocusScreen)