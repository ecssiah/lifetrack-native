import React from 'react'
import { connect } from 'react-redux'
import { ScrollView, View } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcon 
from 'react-native-vector-icons/MaterialCommunityIcons'
import createStyles, { FontSize, Color } from '../../../styles'

import LTIcon from '../../../components/LT/LTIcon';
import LTText from '../../../components/LT/LTText';

const styles = createStyles({
  container: {
    flex: 1,
  },
  focusesSection: {

  },
  focusesHeader: {
    flexDirection: 'row',
    backgroundColor: '#777777',
    padding: 4,
    borderWidth: 1,
    borderColor: Color.secondary,
  },
  focusesIcon: {
    width: 38,
    justifyContent: 'center',
  },
  focusesTitle: {
    fontSize: 22,
    color: '#ffffff',
    paddingTop: 6,
  },
  focusesBody: {
    margin: 4,
  },
  statsSection: {

  },
  statsHeader: {
    flexDirection: 'row',
    backgroundColor: '#777777',
    padding: 4,
    borderWidth: 1,
    borderColor: Color.secondary,
  },
  statsIcon: {
    width: 38,
    paddingLeft: 4,
    justifyContent: 'center',
  },
  statsTitle: {
    fontSize: 22,
    color: '#ffffff',
    paddingTop: 6,
  },
  statsBody: {
    margin: 4,
  },
  settingsSection: {

  },
  settingsHeader: {
    flexDirection: 'row',
    backgroundColor: '#777777',
    padding: 4,
    borderWidth: 1,
    borderColor: Color.secondary,
  },
  settingsIcon: {
    width: 38,
    paddingTop: 2,
    paddingLeft: 3,
    justifyContent: 'center',
  },
  settingsTitle: {
    fontSize: 22,
    color: '#ffffff',
    paddingTop: 6,
  },
  settingsBody: {
    margin: 4,
  },
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
        <ScrollView>
          <View style={styles.focusesSection}>
            <View style={styles.focusesHeader} >
              <MaterialCommunityIcon 
                style={styles.focusesIcon}
                name={'target'} 
                size={32} 
                color={'#ffffff'} 
              />

              <LTText style={styles.focusesTitle}>
                Focuses
              </LTText>

            </View>

            <View style={styles.focusesBody}>
              <LTText>
                The Focuses Screen is the first screen after signing in. It 
                provides a list of the user's focuses organized by their 
                category.
              </LTText>
            </View>
          </View>

          <View style={styles.statsSection}>
            <View style={styles.statsHeader} >
              <Ionicon 
                style={styles.statsIcon}
                name={'ios-podium'} 
                size={32} 
                color={'#ffffff'} 
              />

              <LTText style={styles.statsTitle}>
                Stats
              </LTText>

            </View>

            <View style={styles.statsBody}>
              <LTText>
                The Stats Screen is found at the lower left of the bottom 
                navigation bar. It allows the user to view a chart that displays
                longterm statistics related to their focus history.
              </LTText>
            </View>
          </View>

          <View style={styles.settingsSection}>
            <View style={styles.settingsHeader} >
              <Ionicon 
                style={styles.settingsIcon}
                name={'md-settings'} 
                size={32} 
                color={'#ffffff'} 
              />

              <LTText style={styles.settingsTitle}>
                Settings
              </LTText>

            </View>

            <View style={styles.settingsBody}>
              <LTText>
                The Settings Screen allows the user to update global settings.
              </LTText>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}


const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(HelpScreen)