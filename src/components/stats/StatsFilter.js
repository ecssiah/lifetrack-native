import React from 'react'
import { Switch, TouchableOpacity, View } from 'react-native'
import AntDesignIcon from 'react-native-vector-icons/AntDesign'
import createStyles, { Color } from '../../styles';

import LTText from '../LT/LTText';

const styles = createStyles({
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
  filterButtonsContainer: {
    height: 32,
    backgroundColor: Color.secondary,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: Color.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})

class StatsFilter extends React.Component
{
  _displayStartDate = () => {
    const startDate = new Date(this.props.startDate)

    const dateString = startDate.toLocaleDateString(
      undefined, 
      {'month': 'short', 'day': 'numeric', 'year': 'numeric'}
    )

    return dateString
  }


  _displayEndDate = () => {
    const endDate = new Date(this.props.endDate)

    const dateString = endDate.toLocaleDateString(
      undefined, 
      {'month': 'short', 'day': 'numeric', 'year': 'numeric'}
    )

    return dateString
  }


  render() {
    return (
      <View style={styles.filterButtonsContainer}>
        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={this.props.onStartDatePress}
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
            value={this.props.chartType == 'area'}
            onValueChange={this.props.onChartTypeChange}
          />

          <AntDesignIcon
            color={'black'}
            name={'areachart'} 
            size={22} 
          />
        </View>

        <TouchableOpacity 
          activeOpacity={0.7}
          onPress={this.props.onEndDatePress}
        >
          <LTText style={styles.dateSelectors}>
            {this._displayEndDate()}
          </LTText>
        </TouchableOpacity> 
      </View>
    )
  }
}

export default StatsFilter