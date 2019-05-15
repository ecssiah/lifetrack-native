import React from 'react'
import { Switch, View } from 'react-native'
import FontAwesomeIcon
from 'react-native-vector-icons/FontAwesome'
import createStyles, { Color, FontSize } from '../../styles';

import LTText from '../LT/LTText';

const styles = createStyles({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  icon: {
    flex: 1,
    marginTop: 2,
    marginLeft: 6,
    marginRight: -20,
  },
  text: {
    flex: 6,
    fontSize: FontSize.settingItem,
    textAlign: 'left',
    width: 120,
    marginVertical: 2,
  },
  switch: {
    flex: 1,
    marginTop: -5, 
    marginBottom: -6,
    transform: [ { scaleX: .62 }, { scaleY: .62 } ]
  },
})

class LegendItem extends React.Component
{
  render() {
    return (
      <View style={styles.item}>
        <FontAwesomeIcon
          style={styles.icon}
          name={'circle'} 
          size={20} 
          color={this.props.color}
        />

        <LTText style={styles.text}>
          {this.props.focus.name}
        </LTText>

        <Switch 
          style={styles.switch} 
          value={this.props.focus.statVisible}
          trackColor={{ true: Color.primary, false: Color.secondary }}
          onValueChange={value => this.props.onValueChange(value)}
        />
      </View>
    )
  }
}

export default LegendItem