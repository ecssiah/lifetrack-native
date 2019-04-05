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
import LTSpacer from '../../../components/LT/LTSpacer';

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
    justifyContent: 'space-between',
    alignItems: 'flex-start',
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
    margin: 4,
    padding: 8,
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
    endDate.setDate(startDate.getDate() + 7)

    this.state = {
      startDateModalShow: false,
      endDateModalShow: false,
      startDate,
      endDate,
    }
  }


  static navigationOptions = {
    title: 'Stats',
  }


  _getDateRange(date1, date2, span=1) {
    const d1 = new Date(date1)
    const d2 = new Date(date2)

    const dates = []
    d2.setDate(d2.getDate() + 1)

    while (d1.getTime() != d2.getTime()) {
      dates.push(d1.getTime())
      d1.setDate(d1.getDate() + span)
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
            data[i] = { 
              date: dateRange[i],
              [focusKey]: focus.history[dateRange[i]],
            }
          } else {
            data[i] = { 
              date: dateRange[i],
              [focusKey]: 0, 
            }
          }
        }
      }
    }

    return data
  }


  _mainChartXAxisAccessor() {
  }


  _formatMainChartXAxis(value, index) {
    if (index % 2 == 0) {
      const d = new Date(value)
      const options = { month: 'short', day: 'numeric' }

      return d.toLocaleDateString(undefined, options)
    } else {
      return ''
    }
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

    for (const key of keys) {
      svgs.push({ 
        onPress: () => console.warn(this.props.focuses[key].name)
      })
    }

    return svgs
  }


  _onStartDateSelect = () => {
    this.setState({
      startDateModalShow: true,
    })
  }


  _onEndDateSelect = () => {
    this.setState({
      endDateModalShow: true,
    })
  }


  _onStartDateChange = date => {
    console.warn(date)
  }


  _onStartDateConfirm = () => {

  }


  _onStartDateCancel = () => {
    this.setState({
      startDateModalShow: false,
    })
  }


  _onEndDateChange = date => {
    console.warn(date)
  }


  _onEndDateConfirm = () => {

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
    return (
      <View style={styles.container}>
        <View style={styles.mainChartContainer}>
          <StackedAreaChart 
            style={styles.mainChart}
            yMax={SECONDS_IN_DAY}
            contentInset={{ left: 16, right: 12}}
            data={this._getMainChartData()}
            keys={this._getMainChartKeys()}
            colors={this._getMainChartColors()}
            svgs={this._getMainChartSvgs()}
            curve={shape.curveLinear}
            showGrid={true}
          >
            <Grid/>
          </StackedAreaChart>

          <XAxis
            style={styles.mainChart}
            data={this._getMainChartData()}
            contentInset={{ left: 16, right: 12}}
            xAccessor={({item}) => item.date}
            formatLabel={this._formatMainChartXAxis}
            svg={{ fontSize: 10, fill: 'black' }}
          />
        </View>

        <View style={styles.filterButtonsContainer}>
          <TouchableOpacity 
            onPress={this._onStartDateSelect}
          >
            <LTText style={styles.dateSelectors}>
              {this._displayStartDate()}
            </LTText>
          </TouchableOpacity> 

          <TouchableOpacity 
            onPress={this._onEndDateSelect}
          >
            <LTText style={styles.dateSelectors}>
              {this._displayEndDate()}
            </LTText>
          </TouchableOpacity> 
        </View>

        <DateModal
          show={this.state.startDateModalShow} 
          date={this.state.startDate}
          onDateChange={this._onStartDateChange}
          onConfirm={this._onStartDateConfirm}
          onCancel={this._onStartDateCancel}
        />

        <DateModal
          show={this.state.endDateModalShow} 
          date={this.state.endDate}
          onDateChange={this._onEndDateChange}
          onConfirm={this._onEndDateConfirm}
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