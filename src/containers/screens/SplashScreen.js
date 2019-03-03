import React from 'react';
import { connect } from 'react-redux';
import { auth, db } from '../../config';
import { View, Text } from 'react-native';
import { setSettings } from '../../actions/SettingsActions';
import { setCategories } from '../../actions/CategoriesActions';
import { setFocuses } from '../../actions/FocusesActions';
import createStyles, { Color } from '../../styles';

const styles = createStyles({
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.primary,
  },
  splashTitle: {
    fontSize: 68,
    textShadowOffset: {
      width: -3,
      height: 2,
    },
    textShadowColor: '#111111',
    textShadowRadius: 1,
    color: '#dddddd',
  },
});

class SplashScreen extends React.Component {

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        Promise.all([
          this._loadSettings(),
          this._loadCategories(),
          this._loadFocuses()
        ]).then(values => {
          const settingsDoc = values[0];
          const categoriesDoc = values[1];
          const focusesSnapshot = values[2];

          const settings = {
            workPeriod: settingsDoc.get('workPeriod'),
            workGoal: settingsDoc.get('workGoal'),
            breakPeriod: settingsDoc.get('breakPeriod'),
          };
          this.props.setSettings(settings);

          const categories = categoriesDoc.get('list');
          this.props.setCategories(categories);

          let focuses = {};
          focusesSnapshot.forEach(doc => {
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

          this.props.navigation.navigate('App');
        }).catch(err => {
          console.error(err);
        });
      } else {
        this.props.navigation.navigate('Auth');
      }
    });
  };

  _loadSettings = () => {
    return db.collection('settings').doc(auth.currentUser.uid).get();
  };

  _loadCategories = () => {
    return db.collection('categories').doc(auth.currentUser.uid).get();
  };

  _loadFocuses = () => {
    const focusPromise = db.collection('focuses').where(
      'userId', '==', auth.currentUser.uid
    ).get();

    return focusPromise;
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
  setSettings: settings => dispatch(setSettings(settings)),
  setCategories: categories => dispatch(setCategories(categories)),
  setFocuses: focuses => dispatch(setFocuses(focuses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);