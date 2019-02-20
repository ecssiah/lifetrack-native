import React from 'react';
import { connect } from 'react-redux';
import { auth, db } from '../../config';
import { View, Text } from 'react-native';
import { setFocuses } from '../../actions/FocusesActions';
import createStyles, { Colors } from '../../styles';

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
        this._loadFocuses();
        props.navigation.navigate('App');
      } else {
        props.navigation.navigate('Auth');
      }
    });
  }

  _loadFocuses = () => {
    let focuses = [];

    db.collection('focuses').where(
      'userId', '==', auth.currentUser.uid
    ).get(
    ).then(snapshot => {
      snapshot.forEach(doc => {
        focuses.push({
          id: doc.id,
          userId: doc.get('userId'),
          name: doc.get('name'),
          category: doc.get('category'),
          level: doc.get('level'),
          experience: doc.get('experience'),
        });

        this.props.setFocuses(focuses);
      });
    }).catch(err => {
      console.error(err);
    });
  };

  render() {
    return (
      <View style={styles.splashContainer}>
        <Text style={styles.splashTitle}>LifeTrack</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
  setFocuses: focuses => dispatch(setFocuses(focuses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);