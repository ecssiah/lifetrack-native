import React from 'react'
import { connect } from 'react-redux'
import { TouchableOpacity, View } from 'react-native'
import { StackedAreaChart, Grid, XAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import { getUniqueColors } from '../../../../lib/utils'
import createStyles from '../../../styles'
import { SECONDS_IN_DAY } from '../../../constants/Stats'

import LTText from '../../../components/LT/LTText'
import DateModal from '../../../components/modals/DateModal';

const styles = createStyles({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  mainChartContainer: {
    flex: 1,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    height: 38,
    justifyContent: 'space-between',
  },
  mainText: {
    fontSize: 18,
  },
  mainChart: {
    height: 300,
    margin: 8,
  },
  dateSelectors: {
    flex: 1,
    width: 120,
    textAlign: 'center',
    margin: 4,
    padding: 6,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'black',
  },
})

class StatsScreen extends React.Component 
{
  constructor(props) {
    super(props)

    const startDate = new Date(props.user.startDate)
    let endDate = new Date(props.user.startDate)
    endDate.setDate(startDate.getDate() + 6)

    this.state = {
      startDateModalShow: false,
      endDateModalShow: false,
      startDate,
      endDate,
      startDateSelection: new Date(startDate),
      endDateSelection: new Date(endDate),
      dates: this._getDateRange(startDate, endDate),
    }
  }


  static navigationOptions = {
    title: 'Stats',
  }


  _getDateRange = (date1, date2) => {
    const dates = []
    const d1 = new Date(date1)
    const d2 = new Date(date2)

    d2.setDate(d2.getDate() + 1)

    while (d1.getTime() != d2.getTime()) {
      dates.push(d1.getTime())
      d1.setDate(d1.getDate() + 1)
    }

    return dates
  }


  _getMainChartData = () => {
    const data = []
    const dates = this.state.dates

    for (const focusKey of Object.keys(this.props.focuses)) {
      const focus = this.props.focuses[focusKey]

      for (let i = 0; i < dates.length; i++) {
        if (data[i]) {
          if (focus.history[dates[i]]) {
            data[i][focusKey] = focus.history[dates[i]]
          } else {
            data[i][focusKey] = 0
          }
        } else {
          if (focus.history[dates[i]]) {
            data[i] = { 
              date: dates[i],
              [focusKey]: focus.history[dates[i]],
            }
          } else {
            data[i] = { 
              date: dates[i],
              [focusKey]: 0, 
            }
          }
        }
      }
    }

    return data
  }


  _formatMainChartXAxis = (value, index) => {
    if (index % Math.round(this.state.dates.length / 6) == 0) {
      const d = new Date(value)
      const options = { month: 'numeric', day: 'numeric' }

      return d.toLocaleDateString(undefined, options)
    } else {
      return ''
    }
  }


  _getMainChartKeys = () => {
    const keys = [...new Set(Object.keys(this.props.focuses))]

    return keys
  }


  _getMainChartColors = () => {
    const keys = [...new Set(Object.keys(this.props.focuses))]
    const colors = getUniqueColors(keys.length) 

    return colors
  }


  _getMainChartSvgs = () => {
    const keys = [...new Set(Object.keys(this.props.focuses))]
    const svgs = []

    for (const key of keys) {
      svgs.push({ 
        onPress: () => console.warn(this.props.focuses[key].name)
      })
    }

    return svgs
  }


  _onStartDatePress = () => {
    this.setState({
      startDateModalShow: true,
      startDateSelection: new Date(this.state.startDate),
    })
  }


  _onEndDatePress = () => {
    this.setState({
      endDateModalShow: true,
      endDateSelection: new Date(this.state.endDate),
    })
  }


  _onStartDateChange = date => {
    const startDateSelection = new Date(date)

    if (startDateSelection.getTime() >= this.state.endDateSelection.getTime()) {
      startDateSelection.setMonth(this.state.endDateSelection.getMonth())
      startDateSelection.setFullYear(this.state.endDateSelection.getFullYear())
      startDateSelection.setDate(this.state.endDateSelection.getDate() - 1)
    }

    this.setState({
      startDateSelection,
    })
  }


  _onStartDateSubmit = () => {
    const startDate = new Date(this.state.startDateSelection)

    this.setState({
      startDate,
      dates: this._getDateRange(startDate, this.state.endDate),
      startDateModalShow: false,
    })
  }


  _onStartDateCancel = () => {
    this.setState({
      startDateModalShow: false,
    })
  }


  _onEndDateChange = date => {
    const endDateSelection = new Date(date)

    if (endDateSelection.getTime() <= this.state.startDateSelection.getTime()) {
      endDateSelection.setMonth(this.state.startDateSelection.getMonth())
      endDateSelection.setFullYear(this.state.startDateSelection.getFullYear())
      endDateSelection.setDate(this.state.startDateSelection.getDate() + 1)
    }

    this.setState({
      endDateSelection,
    })
  }


  _onEndDateSubmit = () => {
    const endDate = new Date(this.state.endDateSelection)

    this.setState({
      endDate,
      dates: this._getDateRange(this.state.startDate, endDate),
      endDateModalShow: false,
    })
  }


  _onEndDateConfirm = () => {
    this.setState({
      endDateModalShow: false,
    })
  }


  _onEndDateCancel = () => {
    this.setState({
      endDateModalShow: false,
    })
  }


  _displayStartDate = () => {
    if (this.state.startDate) {
      const dateString = this.state.startDate.toLocaleDateString(
        undefined, 
        {'month': 'short', 'day': 'numeric', 'year': 'numeric'}
      )

      return dateString
    }
  }


  _displayEndDate = () => {
    if (this.state.endDate) {
      const dateString = this.state.endDate.toLocaleDateString(
        undefined, 
        {'month': 'short', 'day': 'numeric', 'year': 'numeric'}
      )

      return dateString
    }
  }


  render() {
    const data = this._getMainChartData()
    const keys = this._getMainChartKeys()
    const colors = this._getMainChartColors()
    const svgs = this._getMainChartSvgs()

    return (
      <View style={styles.container}>
        <View style={styles.mainChartContainer}>
          <StackedAreaChart 
            style={styles.mainChart}
            yMax={SECONDS_IN_DAY}
            contentInset={{ left: 16, right: 12}}
            data={data}
            keys={keys}
            colors={colors}
            svgs={svgs}
            curve={shape.curveNatural}
            showGrid={true}
          >
            <Grid/>
          </StackedAreaChart>

          <XAxis
            style={styles.mainChart}
            data={data}
            contentInset={{ left: 16, right: 12}}
            xAccessor={({item}) => item.date}
            formatLabel={this._formatMainChartXAxis}
            svg={{ fontSize: 10, fill: 'black' }}
          />
        </View>

        <View style={styles.filterButtonsContainer}>
          <TouchableOpacity 
            onPress={this._onStartDatePress}
          >
            <LTText style={styles.dateSelectors}>
              {this._displayStartDate()}
            </LTText>
          </TouchableOpacity> 

          <TouchableOpacity 
            onPress={this._onEndDatePress}
          >
            <LTText style={styles.dateSelectors}>
              {this._displayEndDate()}
            </LTText>
          </TouchableOpacity> 
        </View>

        <DateModal
          title={'Start Date'}
          show={this.state.startDateModalShow} 
          date={this.state.startDateSelection}
          onDateChange={this._onStartDateChange}
          onConfirm={this._onStartDateSubmit}
          onCancel={this._onStartDateCancel}
        />

        <DateModal
          title={'End Date'}
          show={this.state.endDateModalShow} 
          date={this.state.endDateSelection}
          onDateChange={this._onEndDateChange}
          onConfirm={this._onEndDateSubmit}
          onCancel={this._onEndDateCancel}
        />
      </View>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
  focuses: state.focuses,
})


const mapDispatchToProps = dispatch => ({

})


export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen)