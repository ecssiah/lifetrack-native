import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import createStyles, { FontSize } from '../../../styles'

const styles = createStyles({
})

class HelpScreen extends React.Component 
{
  static navigationOptions = ({ navigation }) => ({
    title: 'Help',
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

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen)