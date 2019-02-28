import React from 'react';
import { connect } from 'react-redux';
import { auth, db } from '../../config';
import { View, Text } from 'react-native';
import { loadSettings } from '../../actions/SettingsActions';
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

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this._loadSettings();
        this._loadFocuses();
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('Auth');
      }
    });
  };

  _loadSettings = () => {
    db.collection('settings').where(
      'userId', '==', auth.currentUser.uid
    ).get().then(snapshot => {
      let settings;

      snapshot.forEach(doc => {
        settings = {
          userId: doc.get('userId'),
          workPeriod: doc.get('workPeriod'),
          workGoal: doc.get('workGoal'),
          breakPeriod: doc.get('breakPeriod'),
        };
      });

      this.props.loadSettings(settings);
    }).catch(err => {
      console.error(err);
    });
  };

  _loadFocuses = () => {
    let focuses = {};

    db.collection('focuses').where(
      'userId', '==', auth.currentUser.uid
    ).orderBy('name').get().then(snapshot => {
      snapshot.forEach(doc => {
        focuses[doc.id] = {
          id: doc.get('id'),
          userId: doc.get('userId'),
          name: doc.get('name'),
          category: doc.get('category'),
          time: doc.get('time'),
          periods: doc.get('periods'),
          level: doc.get('level'),
          workPeriod: doc.get('workPeriod'),
          workGoal: doc.get('workGoal'),
          breakPeriod: doc.get('breakPeriod'),
          experience: doc.get('experience'),
          working: doc.get('working'),
          timerActive: doc.get('timerActive'),
          timer: doc.get('timer'),
        };
      });

      this.props.setFocuses(focuses);
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
  loadSettings: settings => dispatch(loadSettings(settings)),
  setFocuses: focuses => dispatch(setFocuses(focuses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);