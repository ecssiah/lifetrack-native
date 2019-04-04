import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { StackedAreaChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { getUniqueColors } from '../../../../lib/utils';
import { LIFE_EXPECTANCY, SECONDS_IN_YEAR } from '../../../constants/User'
import createStyles from '../../../styles'

import LTText from '../../../components/LT/LTText'
import LTSpacer from '../../../components/LT/LTSpacer'

const styles = createStyles({
  container: {
  },
  mainText: {
    fontSize: 18,
  },
  mainChart: {
    height: 320,
    margin: 12,
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

  _getMainChartData() {
    const data = []

    for (const focusKey of Object.keys(this.props.focuses)) {
      const focus = this.props.focuses[focusKey]
      const historyKeys = Object.keys(focus.history)

      for (let i = 0; i < historyKeys.length; i++) {
        if (data[i]) {
          data[i][focusKey] = focus.history[historyKeys[i]]
        } else {
          data[i] = { [focusKey]: focus.history[historyKeys[i]]}
        }
      }
    }

    return data
  }

  _getMainChartKeys() {
    const keys = [...new Set(Object.keys(this.props.focuses))]

    return keys
  }

  _getMainChartColors() {
    const keys = [...new Set(Object.keys(this.props.focuses))]
    const colors = getUniqueColors(keys.length) 

    return colors
  }

  render() {
    return (
      <View style={styles.container}>
        <StackedAreaChart 
          style={styles.mainChart}
          data={this._getMainChartData()}
          keys={this._getMainChartKeys()}
          colors={this._getMainChartColors()}
          curve={shape.curveLinear}
          showGrid={true}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  stats: state.stats,
  focuses: state.focuses,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen)

        // <LTText style={styles.mainText}>
        //   Untracked Time: 
        // </LTText>
          
        // <LTText style={styles.mainText}>
        //   {this._formatUntrackedTime(this.props.stats.untracked)}
        // </LTText>

        // <LTSpacer large />

        // <LTText style={styles.mainText}>
        //   Untracked Percentage: 
        // </LTText>
          
        // <LTText style={styles.mainText}>
        //   {this._getUntrackedLifePercentage()}
        // </LTText>