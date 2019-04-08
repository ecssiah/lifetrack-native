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
    margin: 4,
    backgroundColor: Color.secondary,
  },
  focusesTitle: {
    fontSize: 22,
    color: '#ffffff',
  },
  statsSection: {

  },
  statsHeader: {
    flexDirection: 'row',
    margin: 4,
    backgroundColor: Color.secondary,
  },
  statsTitle: {
    fontSize: 22,
    color: '#ffffff',
  },
  settingsSection: {

  },
  settingsHeader: {
    flexDirection: 'row',
    margin: 4,
    backgroundColor: Color.secondary,
  },
  settingsTitle: {
    fontSize: 22,
    color: '#ffffff',
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
                name={'target'} 
                size={32} 
                color={'#ffffff'} 
              />

              <LTText style={styles.focusesTitle}>
                Focuses
              </LTText>

            </View>

          </View>

          <View style={styles.statsSection}>
            <View style={styles.statsHeader} >
              <Ionicon 
                name={'ios-podium'} 
                size={35} 
                color={'#ffffff'} 
              />

              <LTText style={styles.statsTitle}>
                Stats
              </LTText>

            </View>
          </View>

          <View style={styles.settingsSection}>
            <View style={styles.settingsHeader} >
              <Ionicon 
                name={'md-settings'} 
                size={35} 
                color={'#ffffff'} 
              />

              <LTText style={styles.settingsTitle}>
                Settings
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