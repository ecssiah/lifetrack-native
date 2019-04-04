import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { StackedAreaChart, Grid, XAxis } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import { getUniqueColors } from '../../../../lib/utils';
import { LIFE_EXPECTANCY, SECONDS_IN_YEAR } from '../../../constants/User'
import createStyles from '../../../styles'

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


  _getDateRange(date1, date2) {
    const d1 = new Date(date1)
    const d2 = new Date(date2)

    const dates = []
    d2.setDate(d2.getDate() + 1)

    while (d1.getTime() != d2.getTime()) {
      dates.push(d1.getTime())
      d1.setDate(d1.getDate() + 1)
    }

    return dates
  }


  _getMainChartData() {
    const data = []
    const dateRange = this._getDateRange('March 30, 2019', 'April 4, 2019') 

    for (const focusKey of Object.keys(this.props.focuses)) {
      const focus = this.props.focuses[focusKey]

      for (let i = 0; i < dateRange.length; i++) {
        if (data[i]) {
          if (focus.history[dateRange[i]]) {
            data[i][focusKey] = focus.history[dateRange[i]]
          } else {
            data[i][focusKey] = 0
          }
        } else {
          if (focus.history[dateRange[i]]) {
            data[i] = { [focusKey]: focus.history[dateRange[i]]}
          } else {
            data[i] = { [focusKey]: 0 }
          }
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

  _getMainChartSvgs() {
    const keys = [...new Set(Object.keys(this.props.focuses))]
    const svgs = []

    for (let key of keys) {
      svgs.push({ 
        onPress: () => console.warn(this.props.focuses[key].name)
      })
    }

    return svgs
  }

  render() {
    return (
      <View style={styles.container}>
        <StackedAreaChart 
          style={styles.mainChart}
          contentInset={ { top: 10, bottom: 10 } }
          data={this._getMainChartData()}
          keys={this._getMainChartKeys()}
          colors={this._getMainChartColors()}
          svgs={this._getMainChartSvgs()}
          curve={shape.curveLinear}
          showGrid={true}
        >
          <Grid/>
        </StackedAreaChart>
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