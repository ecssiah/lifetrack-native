import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, Switch, TouchableOpacity, View } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome' 
import { StackedAreaChart, Grid, XAxis } from 'react-native-svg-charts'
import * as scale from 'd3-scale'
import * as shape from 'd3-shape'
import { getUniqueColors } from '../../../../lib/utils'
import { updateFocus } from '../../../handlers/FocusesHandlers'
import createStyles from '../../../styles'
import { SECONDS_IN_DAY } from '../../../constants/Stats'

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
    height: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendLeftColumn: {

  },
  legendRightColumn: {

  },
  legendItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    marginHorizontal: 8,
  },
  legendText: {
    textAlign: 'center',
    margin: 3,
  },
  legendSwitch: {
    margin: -4,
    transform: [
      { scaleX: .6 }, { scaleY: .6 }
    ]
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

    const startDate = new Date(props.user.startDate)
    let endDate = new Date(props.user.startDate)
    endDate.setDate(startDate.getDate() + 6)

    this.state = {
      startDate,
      endDate,
      startDateSelection: new Date(startDate),
      endDateSelection: new Date(endDate),
      startDateModalShow: false,
      endDateModalShow: false,
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
    const focusKeys = Object.keys(this.props.focuses)

    for (const focusKey of focusKeys) {
      const focus = this.props.focuses[focusKey]

      for (let i = 0; i < dates.length; i++) {
        if (data[i] === undefined) {
          data[i] = { date: dates[i] }
        }

        if (focus.visible && focus.history[dates[i]]) {
          data[i][focusKey] = focus.history[dates[i]]
        } else {
          data[i][focusKey] = 0
        }
      }
    }

    return data
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


  _onStartDatePress = () => {
    this.setState({
      startDateModalShow: true,
      startDateSelection: new Date(this.state.startDate),
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


  _onEndDatePress = () => {
    this.setState({
      endDateModalShow: true,
      endDateSelection: new Date(this.state.endDate),
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

  _getMainChartProperties = () => {
    return {
      data: this._getMainChartData(),
      keys: this._getMainChartKeys(),
      colors: this._getMainChartColors(),
      svgs: this._getMainChartSvgs(),
    }
  }


  _getLegendLeftColumn = () => {
    const legendItems = []
    const keys = [...new Set(Object.keys(this.props.focuses))]
    const colors = this._getMainChartColors()

    Object.values(this.props.focuses).forEach((focus, index) => {
      if (index % 2 == 0) {
        legendItems.push(
          <View key={index} style={styles.legendItem}>
            <FontAwesome
              color={colors[index]}
              name={'circle'} 
              size={20} 
            />

            <LTText style={styles.legendText}>
              {focus.name}
            </LTText>

            <LTSpacer medium />

            <Switch 
              style={styles.legendSwitch} 
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
    const keys = [...new Set(Object.keys(this.props.focuses))]
    const colors = this._getMainChartColors()

    Object.values(this.props.focuses).forEach((focus, index) => {
      if (index % 2 == 1) {
        legendItems.push(
          <View key={index} style={styles.legendItem}>
            <FontAwesome
              color={colors[index]}
              name={'circle'} 
              size={20} 
            />

            <LTText style={styles.legendText}>
              {focus.name}
            </LTText>

            <LTSpacer medium />

            <Switch 
              style={styles.legendSwitch} 
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


  render() {
    const mainChart = this._getMainChartProperties()

    return (
      <View style={styles.container}>
        <View style={styles.mainChartContainer}>
          <StackedAreaChart 
            style={styles.mainChart}
            yMax={SECONDS_IN_DAY}
            contentInset={{ left: 16, right: 12}}
            data={mainChart.data}
            keys={mainChart.keys}
            colors={mainChart.colors}
            svgs={mainChart.svgs}
            curve={shape.curveLinear}
            showGrid={true}
          >
            <Grid/>
          </StackedAreaChart>

          <XAxis
            style={styles.mainChart}
            data={mainChart.data}
            contentInset={{ left: 16, right: 12}}
            xAccessor={({item}) => item.date}
            formatLabel={this._formatMainChartXAxis}
            svg={{ fontSize: 10, fill: 'black' }}
          />
        </View>

        <LTSpacer height={168} />

        <View style={styles.filterButtonsContainer}>
          <TouchableOpacity 
            activeOpacity={0.7}
            onPress={this._onStartDatePress}
          >
            <LTText style={styles.dateSelectors}>
              {this._displayStartDate()}
            </LTText>
          </TouchableOpacity> 

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
})


const mapDispatchToProps = dispatch => ({
  updateFocus: (id, update) => updateFocus(dispatch, id, update),
})


export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen)