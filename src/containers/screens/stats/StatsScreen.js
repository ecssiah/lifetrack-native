import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { LIFE_EXPECTANCY, SECONDS_IN_YEAR } from '../../../constants/User'
import createStyles from '../../../styles'

import LTText from '../../../components/LT/LTText'
import LTSpacer from '../../../components/LT/LTSpacer'

const styles = createStyles({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 18,
  },
})

class StatsScreen extends React.Component 
{
  static navigationOptions = {
    title: 'Stats',
  }

  _formatUntrackedTime(time) {
    const days = Math.floor(time / 60 / 60 / 24)
    const hours = Math.floor((time / 60 / 60) - days * 24)
    const minutes = Math.floor((time / 60) - (days * 24 * 60) - (hours * 60))
    const seconds = Math.floor(
      time - (days * 24 * 60 * 60) - (hours * 60 * 60) - (minutes * 60)
    )

    const displayMinutes = minutes < 10 ? '' + minutes : minutes
    const displaySeconds = seconds < 10 ? '0' + seconds : seconds

    let fullTime = ''

    if (days > 1) {
      fullTime += days + ' days, '
    } else if (days > 0) {
      fullTime += days + ' day, '
    }

    if (hours > 0) {
      fullTime += `${hours}:${displayMinutes}:${displaySeconds}`
    } else {
      fullTime += `${minutes}:${displaySeconds}`
    }

    return fullTime
  }

  _getUntrackedLifePercentage() {
    if (isNaN(this.props.user.birthYear)) {
      return 'Requires Birth Year'
    } else {
      const currentYear = new Date().getFullYear()
      const userAge = currentYear - parseInt(this.props.user.birthYear)
      const secondsLeft = (LIFE_EXPECTANCY - userAge) * SECONDS_IN_YEAR
      const percentageUsed = this.props.stats.untracked / secondsLeft 

      return percentageUsed.toFixed(2) + '%'
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <LTText style={styles.mainText}>
          Untracked Time: 
        </LTText>
          
        <LTText style={styles.mainText}>
          {this._formatUntrackedTime(this.props.stats.untracked)}
        </LTText>

        <LTSpacer large />

        <LTText style={styles.mainText}>
          Untracked Percentage: 
        </LTText>
          
        <LTText style={styles.mainText}>
          {this._getUntrackedLifePercentage()}
        </LTText>
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  stats: state.stats,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen)