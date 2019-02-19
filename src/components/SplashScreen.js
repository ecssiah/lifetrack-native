import React from 'react';
import { auth } from '../config';
import { View, Text } from 'react-native';
import createStyles, { Colors } from '../styles';

const styles = createStyles({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary,
  },
  splashTitle: {
    fontSize: 62,
    color: Colors.secondary,
  },
});

class SplashScreen extends React.Component {
  constructor(props) {
    super(props);

    auth.onAuthStateChanged(user => {
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