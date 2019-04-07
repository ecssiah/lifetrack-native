import React from 'react'
import { connect } from 'react-redux'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import { ScrollView, Switch, TouchableOpacity, View } from 'react-native'
import { 
  VictoryArea, VictoryBar, VictoryChart, VictoryAxis, VictoryStack, VictoryTheme 
} from 'victory-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome' 
import { SECONDS_IN_DAY } from '../../../constants/Stats'
import { getUniqueColors } from '../../../../lib/utils'
import { updateFocus } from '../../../handlers/FocusesHandlers'
import { updateStats } from '../../../handlers/StatsHandlers'
import createStyles, { Color } from '../../../styles'

import LTText from '../../../components/LT/LTText'
import LTSpacer from '../../../components/LT/LTSpacer';
import DateModal from '../../../components/modals/DateModal';

const styles = createStyles({
  container: {
    flex: 1,
  },
  mainChartContainer: {
    flex: 1,
  },
  filterButtonsContainer: {
    height: 32,
    backgroundColor: Color.secondary,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Color.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendLeftColumn: {
    flex: 1,
  },
  legendRightColumn: {
    flex: 1,
  },
  legendIcon: {
    marginLeft: -2, 
  },
  legendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    marginHorizontal: 8,
  },
  legendText: {
    textAlign: 'left',
    width: 120,
    marginVertical: 2,
    marginHorizontal: 6,
  },
  legendSwitch: {
    marginLeft: -12,
    marginRight: -6,
    marginTop: -5, 
    marginBottom: -6,
    transform: [ { scaleX: .48 }, { scaleY: .48 } ]
  },
  chartSwitchContainer: {
    flexDirection: 'row',
    marginTop: 3,
  },
  chartSwitch: {
    marginLeft: -10,
    marginRight: -6,
    marginTop: -5, 
    marginBottom: -6,
    transform: [ { scaleX: .48 }, { scaleY: .48 } ],
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
    width: 108,
    overflow: 'hidden',
    backgroundColor: '#dedede',
    fontSize: 12,
    textAlign: 'center',
    margin: 4,
    padding: 2,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: 'black',
  },
})

class StatsScreen extends React.Component 
{
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
      chartType: props.stats.chartType,
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


  _onStartDatePress = () => {
    this.setState({
      startDateModalShow: true,
      startDateSelection: new Date(this.props.stats.startDate),
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


  _onStartDateCancel = () => {
    this.setState({
      startDateModalShow: false,
    })
  }


  _onEndDatePress = () => {
    this.setState({
      endDateModalShow: true,
      endDateSelection: new Date(this.props.stats.endDate),
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


  _onEndDateCancel = () => {
    this.setState({
      endDateModalShow: false,
    })
  }


  _displayStartDate = () => {
    const startDate = new Date(this.props.stats.startDate)

    const dateString = startDate.toLocaleDateString(
      undefined, 
      {'month': 'short', 'day': 'numeric', 'year': 'numeric'}
    )

    return dateString
  }


  _displayEndDate = () => {
    const endDate = new Date(this.props.stats.endDate)

    const dateString = endDate.toLocaleDateString(
      undefined, 
      {'month': 'short', 'day': 'numeric', 'year': 'numeric'}
    )

    return dateString
  }

  _getMainChartProperties = () => {
    return {
      data: this._getMainChartData(),
      keys: this._getMainChartKeys(),
      colors: this._getMainChartColors(),
    }
  }


  _getLegendLeftColumn = () => {
    const legendItems = []
    const keys = this._getMainChartKeys()
    const colors = this._getMainChartColors()

    Object.values(this.props.focuses).forEach((focus, index) => {
      if (index % 2 == 0) {
        legendItems.push(
          <View key={index} style={styles.legendItem}>
            <FontAwesomeIcon
              style={styles.legendIcon}
              color={colors[index]}
              name={'circle'} 
              size={20} 
            />

            <LTText style={styles.legendText}>
              {focus.name}
            </LTText>

            <Switch 
              style={styles.legendSwitch} 
              trackColor={{ true: Color.primary, false: Color.secondary }}
              value={this.props.focuses[keys[index]].visible}
              onValueChange={value => {
                this.props.updateFocus(keys[index], { visible: value })
              }}
            />
          </View>
        )
      }
    })

    return legendItems
  }


  _getLegendRightColumn = () => {
    const legendItems = []
    const keys = this._getMainChartKeys()
    const colors = this._getMainChartColors()

    Object.values(this.props.focuses).forEach((focus, index) => {
      if (index % 2 == 1) {
        legendItems.push(
          <View key={index} style={styles.legendItem}>
            <FontAwesomeIcon
              style={styles.legendIcon}
              color={colors[index]}
              name={'circle'} 
              size={20} 
            />

            <LTText style={styles.legendText}>
              {focus.name}
            </LTText>

            <Switch 
              style={styles.legendSwitch} 
              trackColor={{ true: Color.primary, false: Color.secondary }}
              value={this.props.focuses[keys[index]].visible}
              onValueChange={value => {
                this.props.updateFocus(keys[index], { visible: value })
              }}
            />
          </View>
        )
      }        
    })

    return legendItems
  }


  _getMainChartKeys = () => {
    const keys = Object.keys(this.props.focuses)

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
          undefined, { 'month': 'numeric', 'day': 'numeric', 'year': 'numeric' }
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


  _getMainChartStack = data => {
    const stack = []

    for (const key of this._getMainChartKeys()) {
      if (this.props.stats.chartType == 'area') {
        stack.push(
          <VictoryArea
            key={key}
            data={data[key]}
            x='date'
            y='seconds'
            interpolation={'basis'}
          />
        )
      } else {
        stack.push(
          <VictoryBar
            key={key}
            data={data[key]}
            x='date'
            y='seconds'
          />
        )
      }
    }

    return stack
  }

  _formatMainChartXAxis = (value, index) => {
    let options
    if (this.state.dates.length > 360) {
      options = { year: 'numeric', month: 'numeric' }
    } else {
      options = { month: 'numeric', day: 'numeric' }
    }

    if (index % Math.round(this.state.dates.length / 6) == 0) {
      return new Date(value).toLocaleDateString(undefined, options)
    } else {
      return ''
    }
  }


  render() {
    const mainChart = this._getMainChartProperties()

    return (
      <View style={styles.container}>
        <View style={styles.mainChartContainer}>
          <VictoryChart 
            padding={26}
            maxDomain={{ y: SECONDS_IN_DAY }}
          >
            <VictoryAxis
              tickValues={this.state.dates}
              tickFormat={this._formatMainChartXAxis}
            />

            <VictoryStack
              colorScale={this._getMainChartColors()} 
            >
              {this._getMainChartStack(mainChart.data)}
            </VictoryStack>
          </VictoryChart>
        </View>

        <LTSpacer height={164} />

        <View style={styles.filterButtonsContainer}>
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={this._onStartDatePress}
          >
            <LTText style={styles.dateSelectors}>
              {this._displayStartDate()}
            </LTText>
          </TouchableOpacity> 

          <View style={styles.chartSwitchContainer}>
            <AntDesignIcon
              color={'black'}
              name={'barschart'} 
              size={22} 
            />

            <Switch 
              style={styles.chartSwitch} 
              trackColor={{ true: Color.primary, false: Color.primary }}
              ios_backgroundColor={Color.primary}
              value={this.state.chartType == 'area'}
              onValueChange={value => {
                this.props.updateStats({ chartType: value ? 'area': 'bar' })

                this.setState({
                  chartType: value ? 'area' : 'bar',
                })
              }}
            />

            <AntDesignIcon
              color={'black'}
              name={'areachart'} 
              size={22} 
            />
          </View>

          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={this._onEndDatePress}
          >
            <LTText style={styles.dateSelectors}>
              {this._displayEndDate()}
            </LTText>
          </TouchableOpacity> 
        </View>

        <ScrollView>
          <LTSpacer small />

          <View style={styles.legendContainer}>
            <View style={styles.legendLeftColumn}>
              {this._getLegendLeftColumn()}
            </View>

            <View style={styles.legendRightColumn}>
              {this._getLegendRightColumn()}
            </View>
          </View>
        </ScrollView>

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
  stats: state.stats,
})


const mapDispatchToProps = dispatch => ({
  updateFocus: (id, update) => updateFocus(dispatch, id, update),
  updateStats: update => updateStats(dispatch, update),
})


export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen)