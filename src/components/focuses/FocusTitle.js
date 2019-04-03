import React from 'react'
import { Text, View } from 'react-native'
import createStyles, { Color } from '../../styles'

import LTText from '../LT/LTText'

const styles = createStyles({
  background: {
    alignSelf: 'stretch',
    backgroundColor: '#bbbbbb',
    borderColor: Color.primary,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    marginTop: 84,
  },
  title: {
    fontSize: 38,
    color: '#444444',
    textAlign: 'center',
    textShadowOffset: { width: -1, height: 1 },
    textShadowColor: 'black',
    textShadowRadius: 0,
    paddingHorizontal: 4,
    paddingVertical: 12,
  },
})

class FocusTitle extends React.PureComponent 
{
  render() {
    return (
      <View style={styles.background}>
        <LTText style={styles.title}>
          {this.props.name}
        </LTText>
      </View>
    )
  }
}

export default FocusTitle