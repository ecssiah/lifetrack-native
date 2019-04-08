import React from 'react'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import { ScrollView, Switch, View } from 'react-native'
import createStyles, { Color } from '../../../styles';

import LTSpacer from '../../../components/LT/LTSpacer';
import LTText from '../../../components/LT/LTText';

const styles = createStyles({
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
})

class StatsLegend extends React.Component
{
  _getLegendLeftColumn = () => {
    const legendItems = []
    const keys = this.props.keys
    const colors = this.props.colors

    keys.forEach((key, index) => {
      if (index % 2 == 0) {
        const focus = this.props.focuses[key]

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
              onValueChange={value => this.props.onFocusVisibilityChange(key, value)}
            />
          </View>
        )
      }
    })

    return legendItems
  }


  _getLegendRightColumn = () => {
    const legendItems = []
    const keys = this.props.keys
    const colors = this.props.colors

    keys.forEach((key, index) => {
      if (index % 2 == 1) {
        const focus = this.props.focuses[key]

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
              value={this.props.focuses[key].visible}
              onValueChange={value => this.props.onFocusVisibilityChange(key, value)}
            />
          </View>
        )
      }        
    })

    return legendItems
  }


  render() {
    return (
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
    )
  }
}

export default StatsLegend