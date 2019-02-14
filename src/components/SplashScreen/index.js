import React from 'react';
import { View, Text } from 'react-native';
import styles from './style';
import { firebaseApp } from '../../config';

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);

    firebaseApp.auth().onAuthStateChanged(user => {
      if (user) {
        props.navigation.navigate('App');
      } else {
        props.navigation.navigate('Auth');
      }
    });
  }

  render() {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashTitle}>LifeTrack</Text>
      </View>
    );
  }
}

export default SplashScreen;