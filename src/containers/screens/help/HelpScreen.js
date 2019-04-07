import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import createStyles, { FontSize } from '../../../styles'

import LTIcon from '../../../components/LT/LTIcon';

const styles = createStyles({
})

class HelpScreen extends React.Component 
{
  static navigationOptions = ({ navigation }) => ({
    title: 'Help',
    headerLeft: (
      <LTIcon
        type='ios-arrow-back'
        size={32}
        onPress={() => navigation.goBack()}
      />
    ),
  })


  render() {
    return (
      <View style={styles.container}>
      </View>
    )
  }
}


const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(HelpScreen)