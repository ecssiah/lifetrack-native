import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { GraphColors } from '../../../constants/Stats';
import { updateFocus, updateFocusDB } from '../../../handlers/FocusesHandlers'
import { updateStats, updateStatsDB } from '../../../handlers/StatsHandlers'
import createStyles from '../../../styles'

import LTIcon from '../../../components/LT/LTIcon';
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
  static navigationOptions = ({ navigation }) => ({
    title: 'Stats',
    headerLeft: (
      <LTIcon
        type='md-help'
        size={26}
        onPress={() => navigation.getParam('statsHelpSelect')()}
      />
    ),
  })


  constructor(props) {
    super(props)

    const startDateSelection = new Date(props.stats.startDate)
    const endDateSelection = new Date(props.stats.endDate)

    this.state = {
      startDateModalShow: false,
      endDateModalShow: false,
      startDateSelection,
      endDateSelection,
      dates: this._getDateRange(startDateSelection, endDateSelection),
    }
  }


  componentDidMount() {
    this.props.navigation.setParams({
      statsHelpSelect: this._statsHelpSelect,
    })
  }

  
  _statsHelpSelect = () => {
    this.props.navigation.navigate('StatsHelp')
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
      startDateSelection.setDate(this.state.endDateSelection.getDate() - 6)
    }

    this.setState({
      startDateSelection,
    })
  }


  _onStartDateSubmit = () => {
    const startDate = new Date(this.state.startDateSelection)

    const update = {
      startDate: startDate.getTime(),
    }

    this.props.updateStats(update)
    this.props.updateStatsDB(update)

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
      endDateSelection.setDate(this.state.startDateSelection.getDate() + 6)
    }

    this.setState({
      endDateSelection,
    })
  }


  _onEndDateSubmit = () => {
    const endDate = new Date(this.state.endDateSelection)

    const update = {
      endDate: endDate.getTime(),
    }

    this.props.updateStats(update)
    this.props.updateStatsDB(update)

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

      return nameA.localeCompare(nameB, undefined, { numeric: true })
    })

    return keys
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

        if (focus.statVisible && focus.history[dateString]) {
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

    update = {
      chartType,
    }

    this.props.updateStats(update)
    this.props.updateStatsDB(update)
  }


  _onCategoryVisibilityChange = name => {
    console.warn(name)
  }


  _onFocusVisibilityChange = (id, value) => {
    const update = { focusVisible: value }

    this.props.updateFocus(id, update)
    this.props.updateFocusDB(id, update)
  }
  

  render() {
    const data = this._getMainChartData()
    const keys = this._getMainChartKeys()

    return (
      <View style={styles.container}>
        <StatsChart
          data={data}
          keys={keys}
          colors={GraphColors}
          dates={this.state.dates}
          chartType={this.props.stats.chartType}
        />

        <StatsFilter
          startDate={this.props.stats.startDate}
          endDate={this.props.stats.endDate}
          onStartDatePress={this._onStartDatePress}
          onEndDatePress={this._onEndDatePress}
          chartType={this.props.stats.chartType}
          onChartTypeChange={this._onChartTypeChange}
        />

        <StatsLegend
          categories={this.props.categories}
          focuses={this.props.focuses}
          keys={keys}
          colors={GraphColors}
          onCategoryVisibilityChange={this._onCategoryVisibilityChange}
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
  categories: state.categories,
})


const mapDispatchToProps = dispatch => ({
  updateFocus: (id, update) => updateFocus(dispatch, id, update),
  updateFocusDB: (id, update) => updateFocusDB(id, update),
  updateStats: update => updateStats(dispatch, update),
  updateStatsDB: update => updateStatsDB(update),
})


export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen)