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
  leftColumn: {
    flex: 1,
  },
  rightColumn: {
    flex: 1,
  },
  icon: {
    marginLeft: -2, 
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    marginHorizontal: 8,
  },
  text: {
    textAlign: 'left',
    width: 120,
    marginVertical: 2,
    marginHorizontal: 6,
  },
  switch: {
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

    this.props.keys.forEach((key, index) => {
      if (index % 2 == 0) {
        const focus = this.props.focuses[key]

        legendItems.push(
          <View key={index} style={styles.item}>
            <FontAwesomeIcon
              style={styles.icon}
              name={'circle'} 
              size={20} 
              color={this.props.colors[index]}
            />

            <LTText style={styles.text}>
              {focus.name}
            </LTText>

            <Switch 
              style={styles.switch} 
              value={focus.visible}
              trackColor={{ true: Color.primary, false: Color.secondary }}
              onValueChange={value => {
                this.props.onFocusVisibilityChange(key, value)
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

    this.props.keys.forEach((key, index) => {
      if (index % 2 == 1) {
        const focus = this.props.focuses[key]

        legendItems.push(
          <View key={index} style={styles.item}>
            <FontAwesomeIcon
              style={styles.icon}
              name={'circle'} 
              size={20} 
              color={this.props.colors[index]}
            />

            <LTText style={styles.text}>
              {focus.name}
            </LTText>

            <Switch 
              style={styles.switch} 
              value={focus.visible}
              trackColor={{ true: Color.primary, false: Color.secondary }}
              onValueChange={value => {
                this.props.onFocusVisibilityChange(key, value)
              }}
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
          <View style={styles.leftColumn}>
            {this._getLegendLeftColumn()}
          </View>

          <View style={styles.rightColumn}>
            {this._getLegendRightColumn()}
          </View>
        </View>
      </ScrollView>
    )
  }
}

export default StatsLegend