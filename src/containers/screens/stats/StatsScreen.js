import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { getUniqueColors } from '../../../../lib/utils'
import { updateFocus } from '../../../handlers/FocusesHandlers'
import { updateStats } from '../../../handlers/StatsHandlers'
import createStyles from '../../../styles'

import DateModal from '../../../components/modals/DateModal';
import StatsChart from '../../../components/stats/StatsChart';
import StatsFilter from '../../../components/stats/StatsFilter';
import StatsLegend from '../../../components/stats/StatsLegend';

const styles = createStyles({
  container: {
    flex: 1,
  },
})

class StatsScreen extends React.Component 
{
  static navigationOptions = {
    title: 'Stats',
  }


  constructor(props) {
    super(props)

    const startDateSelection = new Date(props.stats.startDate)
    const endDateSelection = new Date(props.stats.endDate)

    this.state = {
      startDateModalShow: false,
      endDateModalShow: false,
      startDateSelection,
      endDateSelection,
      chartType: props.stats.chartType,
      dates: this._getDateRange(startDateSelection, endDateSelection),
    }
  }


  _onStartDatePress = () => {
    this.setState({
      startDateModalShow: true,
      startDateSelection: new Date(this.props.stats.startDate),
    })
  }


  _onStartDateCancel = () => {
    this.setState({
      startDateModalShow: false,
    })
  }


  _onStartDateChange = date => {
    const startDateSelection = new Date(date)

    if (startDateSelection.getTime() >= this.state.endDateSelection.getTime()) {
      startDateSelection.setFullYear(this.state.endDateSelection.getFullYear())
      startDateSelection.setMonth(this.state.endDateSelection.getMonth())
      startDateSelection.setDate(this.state.endDateSelection.getDate() - 1)
    }

    this.setState({
      startDateSelection,
    })
  }


  _onStartDateSubmit = () => {
    const startDate = new Date(this.state.startDateSelection)

    this.props.updateStats({ startDate: startDate.getTime() })

    this.setState({
      startDateModalShow: false,
      dates: this._getDateRange(startDate, new Date(this.props.stats.endDate)),
    })
  }


  _onEndDatePress = () => {
    this.setState({
      endDateModalShow: true,
      endDateSelection: new Date(this.props.stats.endDate),
    })
  }


  _onEndDateCancel = () => {
    this.setState({
      endDateModalShow: false,
    })
  }


  _onEndDateChange = date => {
    const endDateSelection = new Date(date)

    if (endDateSelection.getTime() <= this.state.startDateSelection.getTime()) {
      endDateSelection.setFullYear(this.state.startDateSelection.getFullYear())
      endDateSelection.setMonth(this.state.startDateSelection.getMonth())
      endDateSelection.setDate(this.state.startDateSelection.getDate() + 1)
    }

    this.setState({
      endDateSelection,
    })
  }


  _onEndDateSubmit = () => {
    const endDate = new Date(this.state.endDateSelection)

    this.props.updateStats({ endDate: endDate.getTime() })

    this.setState({
      endDateModalShow: false,
      dates: this._getDateRange(new Date(this.props.stats.startDate), endDate),
    })
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


  _getMainChartKeys = () => {
    const keys = Object.keys(this.props.focuses).sort((a, b) => {
      const nameA = this.props.focuses[a].name
      const nameB = this.props.focuses[b].name

      return nameA.localeCompare(nameB)
    })

    return keys
  }


  _getMainChartColors = () => {
    const keys = this._getMainChartKeys()
    const colors = getUniqueColors(keys.length) 

    return colors
  }


  _getMainChartData = () => {
    const data = {}
    const dates = this.state.dates

    for (const key of this._getMainChartKeys()) {
      data[key] = []
      const focus = this.props.focuses[key]

      for (let i = 0; i < dates.length; i++) {
        const focusData = { date: dates[i] } 
        const dateString = new Date(dates[i]).toLocaleDateString(
          undefined, 
          { 'month': 'numeric', 'day': 'numeric', 'year': 'numeric' }
        )

        if (focus.visible && focus.history[dateString]) {
          focusData.seconds = focus.history[dateString]
        } else {
          focusData.seconds = 0
        }

        data[key].push(focusData)
      }
    }

    return data
  }


  _onChartTypeChange = value => {
    const chartType = value ? 'area' : 'bar'

    this.props.updateStats({ 
      chartType,
    })

    this.setState({
      chartType,
    })
  }


  _onFocusVisibilityChange = (key, value) => {
    this.props.updateFocus(key, { visible: value })
  }
  

  render() {
    const data = this._getMainChartData()
    const keys = this._getMainChartKeys()
    const colors = this._getMainChartColors()

    return (
      <View style={styles.container}>
        <StatsChart
          data={data}
          keys={keys}
          colors={colors}
          dates={this.state.dates}
          chartType={this.state.chartType}
        />

        <StatsFilter
          startDate={this.props.stats.startDate}
          endDate={this.props.stats.endDate}
          onStartDatePress={this._onStartDatePress}
          onEndDatePress={this._onEndDatePress}
          chartType={this.state.chartType}
          onChartTypeChange={this._onChartTypeChange}
        />

        <StatsLegend
          focuses={this.props.focuses}
          keys={keys}
          colors={colors}
          onFocusVisibilityChange={this._onFocusVisibilityChange}
        />

        <DateModal
          title={'Start Date'}
          show={this.state.startDateModalShow}
          date={this.state.startDateSelection}
          onChange={this._onStartDateChange}
          onConfirm={this._onStartDateSubmit}
          onCancel={this._onStartDateCancel}
        />

        <DateModal
          title={'End Date'}
          show={this.state.endDateModalShow}
          date={this.state.endDateSelection}
          onChange={this._onEndDateChange}
          onConfirm={this._onEndDateSubmit}
          onCancel={this._onEndDateCancel}
        />
      </View>
    )
  }
}


const mapStateToProps = state => ({
  focuses: state.focuses,
  stats: state.stats,
})


const mapDispatchToProps = dispatch => ({
  updateFocus: (id, update) => updateFocus(dispatch, id, update),
  updateStats: update => updateStats(dispatch, update),
})


export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen)