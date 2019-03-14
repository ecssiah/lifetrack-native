import React from 'react';
import { connect } from 'react-redux';
import { auth, db } from '../../config';
import { View, Text } from 'react-native';
import { setSettings } from '../../actions/SettingsActions';
import { setCategories } from '../../actions/CategoriesActions';
import { setFocuses } from '../../actions/FocusesActions';
import createStyles, { Color, FontSize } from '../../styles';

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
  _loadSettings = () => {
    return db.collection('settings').doc(auth.currentUser.uid).get();
  };

  _loadCategories = () => {
    return db.collection('categories').doc(auth.currentUser.uid).get();
  };

  _loadFocuses = () => {
    let query;
    query = db.collection('focuses');
    query = query.where('userId', '==', auth.currentUser.uid);

    return query.get();
  };

  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (!user) return this.props.navigation.navigate('Auth');

      Promise.all([
        this._loadSettings(),
        this._loadCategories(),
        this._loadFocuses()
      ]).then(values => {
        const settingsDoc = values[0];
        const categoriesDoc = values[1];
        const focusesSnapshot = values[2];

        let focuses = {};
        focusesSnapshot.forEach(doc => focuses[doc.id] = doc.data());

        this.props.setFocuses(focuses);
        this.props.setSettings(settingsDoc.data());
        this.props.setCategories(categoriesDoc.data().list);

        this.props.navigation.navigate('App');
      }).catch(err => {
        console.error(err);
      });
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
  setSettings: settings => dispatch(setSettings(settings)),
  setCategories: categories => dispatch(setCategories(categories)),
  setFocuses: focuses => dispatch(setFocuses(focuses)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);