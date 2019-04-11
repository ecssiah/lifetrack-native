import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import createStyles from '../../styles';

const styles = createStyles({
})


class GoogleSignIn extends React.Component
{
  render() {
    const imagePath = '../../../assets/images/'

    return (
      <View >
        <TouchableOpacity 
          onPress={this.props.onGoogleSignIn} 
        >
          <Image
            source={
              require(imagePath + 'btn_google_signin_dark_normal_web.png')
            }
          />
        </TouchableOpacity>
      </View>
    )
  }
}

export default GoogleSignIn