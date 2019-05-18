import React from 'react'
import { View } from 'react-native'
import { 
  VictoryChart, VictoryAxis, VictoryStack, VictoryArea, VictoryBar 
} from 'victory-native'
import { SECONDS_IN_DAY, GraphColors } from '../../constants/Stats';


class StatsChart extends React.Component 
{
  _mainChartTickFormat = (value, index) => {
    let options
    if (this.props.dates.length > 360) {
      options = { year: 'numeric', month: 'numeric' }
    } else {
      options = { month: 'numeric', day: 'numeric' }
    }

    if (index % Math.round(this.props.dates.length / 6) === 0) {
      return new Date(value).toLocaleDateString(undefined, options)
    } else {
      return ''
    }
  }


  _getMainChartStack = () => {
    const stack = []

    for (const key of this.props.keys) {
      const color = GraphColors[this.props.focuses[key].chartColor]

      if (this.props.chartType === 'area') {
        stack.push(
          <VictoryArea
            style={{
              data: { fill: color }
            }}
            key={key}
            data={this.props.data[key]}
            x='date'
            y='seconds'
            interpolation={'basis'}
          />
        )
      } else {
        stack.push(
          <VictoryBar
            style={{
              data: { fill: color }
            }}
            key={key}
            data={this.props.data[key]}
            x='date'
            y='seconds'
          />
        )
      }
    }

    return stack
  }


  render() {
    return (
      <View>
        <VictoryChart 
          domainPadding={12}
          padding={{ top: 12, bottom: 34, left: 12, right: 12 }}
          maxDomain={{ y: SECONDS_IN_DAY }}
        >
          <VictoryAxis
            tickValues={this.props.dates}
            tickFormat={this._mainChartTickFormat}
          />

          <VictoryAxis
            dependentAxis
            tickFormat={() => ''}
            style={{
              axis: { stroke: 'none' },
              grid: { stroke: '#cccccc' },
            }}
          />

          <VictoryStack 
          >
            {this._getMainChartStack()}
          </VictoryStack>
        </VictoryChart>
      </View>
    )
  }
}


export default StatsChart