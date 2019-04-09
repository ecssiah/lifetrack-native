import React from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { ScrollView, Switch, View } from 'react-native'
import createStyles, { Color, FontSize } from '../../styles';

import LTSpacer from '../LT/LTSpacer';
import LTText from '../LT/LTText';
import LegendItem from './LegendItem';

const styles = createStyles({
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    flex: 1,
    marginHorizontal: 24,
  },
})

class StatsLegend extends React.Component
{
  _getList = () => {
    const legendItems = []

    this.props.keys.forEach((key, index) => {
      const focus = this.props.focuses[key]
      focus.id = key

      legendItems.push(
        <LegendItem
          key={key}
          focus={focus}
          color={this.props.colors[index]}
          onValueChange={value => 
            this.props.onFocusVisibilityChange(key, value)
          }
        />
      )
    })

    return legendItems
  }

  render() {
    return (
      <ScrollView>
        <LTSpacer small />

        <View style={styles.legendContainer}>
          <View style={styles.list} >
            {this._getList()}
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default StatsLegend