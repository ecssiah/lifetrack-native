import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import createStyles, { Color } from '../../styles';

const styles = createStyles({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

class LTLoading extends React.Component
{
  render() {
    return (
      <View style={styles.container} >
        <ActivityIndicator 
          size='large' 
          color={Color.primary} 
        />
      </View>
    )
  }

}

export default LTLoading