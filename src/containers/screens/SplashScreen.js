import React from 'react';
import { connect } from 'react-redux';
import { auth } from '../../config/fbConfig';
import { View, Text } from 'react-native';
import createStyles, { Color, FontSize } from '../../styles';
import { loadUserHandler } from '../../handlers/AuthHandlers';

const styles = createStyles({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
  },
  title: {
    fontSize: FontSize.splashTitle,
    color: '#dddddd',
    textShadowColor: '#111111',
    textShadowRadius: 1,
    textShadowOffset: { width: -3, height: 2, },
  },
});

class SplashScreen extends React.Component 
{
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.loadUser();
      } else {
        this.props.navigation.navigate('Auth');
      }
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>LifeTrack</Text>
      </View>
    );
  };
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  loadUser: () => loadUserHandler(dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);