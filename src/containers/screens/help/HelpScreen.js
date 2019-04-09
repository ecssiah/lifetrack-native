import React from 'react'
import { connect } from 'react-redux'
import { Image, ScrollView, View } from 'react-native'
import Ionicon from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcon 
from 'react-native-vector-icons/MaterialCommunityIcons'
import createStyles, { FontSize, Color, Screen } from '../../../styles'

import LTIcon from '../../../components/LT/LTIcon';
import LTText from '../../../components/LT/LTText';
import LTSpacer from '../../../components/LT/LTSpacer';

const styles = createStyles({
  container: {
    flex: 1,
  },
  introSection: {
  },
  introHeader: {
    flexDirection: 'row',
    backgroundColor: '#777777',
    padding: 4,
    paddingLeft: 20,
    borderWidth: 1,
    borderColor: Color.secondary,
  },
  introTitle: {
    fontSize: 22,
    color: '#ffffff',
    paddingTop: 6,
  },
  introBody: {
    margin: 12,
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
    paddingTop: 2,
    paddingLeft: 1,
    justifyContent: 'center',
  },
  focusesTitle: {
    fontSize: 22,
    color: '#ffffff',
    paddingTop: 6,
  },
  focusesBody: {
    margin: 12,
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
    paddingTop: 0,
    paddingLeft: 4,
    justifyContent: 'center',
  },
  statsTitle: {
    fontSize: 22,
    color: '#ffffff',
    paddingTop: 6,
  },
  statsBody: {
    margin: 12,
  },
  statsMainChartImage: {
    maxWidth: Screen.w - 24,
    height: 220,
  },
  statsFilterButtonsImage: {
    margin: 4,
    maxWidth: Screen.w - 32,
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
    margin: 12,
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
      <ScrollView style={styles.container}>
        <View style={styles.introSection} >
          <View style={styles.introHeader} >
            <LTText style={styles.introTitle}>
              Introduction
            </LTText>
          </View>

          <View style={styles.introBody} >
            <LTText>
              LifeTrack is based on the Pomodoro technique for time 
              management. This technique uses a timer to break up work into
              small periods followed by short breaks. It adds to this basic 
              technique by tracking longterm progress towards a collection of 
              focuses.
            </LTText>

            <LTSpacer />

            <LTText>
              Each focus is meant to represent a particular area of work (i.e. 
              'Cardio', 'Programming', or 'Greek Language'). A focus has a level 
              that represents the total amount of time the user has dedicated to 
              it. These levels are displayed on the main Focuses Screen and when 
              the focus is highlighted on the Focus Screen. 
            </LTText>

            <LTSpacer />

            <LTText>
              A focus also has a Work Period, Break Period, and Work Goal.
              The Work Period is the length of each session before a break 
              occurs, and the Break Period is the length of each break. 
            </LTText>
              
            <LTSpacer />

            <LTText>
              A Work Goal is the number of Work Periods the user is currently 
              trying to reach. After the goal has been met then a longer break 
              can be taken and the whole process can start again.
            </LTText>

            <LTSpacer />
          </View>
        </View>

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
            <LTText style={{ fontWeight: 'bold' }}>
              Focuses Screen:
            </LTText>

            <LTText>
              The Focuses Screen is the first screen loaded after signing in. 
              It provides a list of the user's focuses organized by category. 
              Each category name can be selected to hide its focuses. 
              Selecting any of the focuses will take the user to the Focus 
              Screen. It can also be found by selecting the target icon in the 
              middle of the bottom navigation bar.
            </LTText>

            <LTSpacer />

            <LTText>
              At the top right of the Focuses Screen, there is a plus icon
              that allows the user to create a new focus.
            </LTText>

            <LTSpacer />

            <LTText>
              At the top left of the Focuses Screen, there is a help icon
              that allows the user to return to this Help Screen.
            </LTText>

            <LTSpacer />

            <LTText style={{ fontWeight: 'bold' }}>
              Focus Screen:
            </LTText>

            <LTText>
              The Focus Screen allows the user to track a specific focus. This
              screen has a large timer at the center. This timer can be 
              pressed to begin tracking the focus. 
            </LTText>

            <LTSpacer />

            <LTText>
              When the timer is:
            </LTText>
            <LTText>
              <LTText style={{color: Color.highlight}} >Red </LTText>
              - the focus is paused
            </LTText>
            <LTText>
              <LTText style={{color: Color.working}} >Blue </LTText>
              - the focus is being tracked 
            </LTText>
            <LTText>
              <LTText style={{color: Color.break}} >Green </LTText>
              - the focus is on a break
            </LTText>

            <LTSpacer />
                
            <LTText>
              At the top right of the Focus Screen, there is an icon that
              takes the user to the Focus Edit Screen.
            </LTText>

            <LTSpacer />
              
            <LTText style={{ fontWeight: 'bold' }}>
              Focus Edit Screen:
            </LTText>

            <LTText>
              The Focus Edit Screen allows the user to edit the details of
              each focus. The user can edit the name of the focus and change
              its category. This page also allows the user to delete the 
              focus.
            </LTText>

            <LTSpacer />

            <LTText>
              The user can also edit the length of each Work Period and Break
              Period. They can also set a number of periods to be used as a 
              Work Goal for the focus.
            </LTText>

            <LTSpacer />
          </View>
        </View>

        <View style={styles.statsSection}>
          <View style={styles.statsHeader} >
            <Ionicon 
              style={styles.statsIcon}
              name={'ios-podium'} 
              size={34} 
              color={'#ffffff'} 
            />

            <LTText style={styles.statsTitle}>
              Stats
            </LTText>
          </View>

          <View style={styles.statsBody}>
            <LTText style={{ fontWeight: 'bold' }}>
              Stats Screen:
            </LTText>

            <LTText>
              The Stats Screen displays the history of the account's focuses. 
              It can be reached from the graph icon at the lower left of the 
              bottom navigation bar.
            </LTText>

            <Image 
              style={styles.statsMainChartImage}
              source={require('../../../../assets/images/main-chart.png')} 
              resizeMode='contain'
            />

            <LTSpacer />

            <LTText>
              In the middle of the Stats Screen, there is a bar that allows
              the user to change the way the chart is displayed. 
            </LTText>

            <Image 
              style={styles.statsFilterButtonsImage}
              source={require('../../../../assets/images/filter-buttons.png')} 
              resizeMode='contain'
            />

            <LTText>
              The button on the left will allow the user to change the 
              starting date for the chart. The button on the right allows the 
              ending date to be changed. The switch in the middle changes the 
              chart between a bar graph and an area graph. 
            </LTText>

            <LTSpacer />

            <LTText>
              At the bottom of the Stats Screen, there is a list of the user's
              focuses. They have color-coded icons next to their names which 
              match the colors used in the chart at the top of the screen. 
              Each focus also has a switch next to it that allows the user to
              hide its data.
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
            <LTText style={{ fontWeight: 'bold' }}>
              Settings Screen:
            </LTText>

            <LTText>
              The Settings Screen allows the user to update global settings. 
              It can be accessed using the gear icon on the right of the
              bottom navigtion bar.
            </LTText>

            <LTSpacer />

            <LTText>
              At the bottom of the Settings Screen the user can log out of
              their account.
            </LTText>

            <LTSpacer />

            <LTText>
              The General section of the Settings Screen allows the user to 
              edit the global values for Work Period, Break Period, and Work
              Goal. These values will be assigned to new focuses. They can be
              overriden by setting local settings for each focus on the Focus
              Edit Screen.
            </LTText>

            <LTSpacer />

            <LTText style={{ fontWeight: 'bold' }}>
              Profile Screen:
            </LTText>
                
            <LTText>
              At the top of the Settings Screen, the user can access the 
              Profile Screen. This allows them to edit the details of their
              account like their email address.
            </LTText>

            <LTSpacer />

            <LTText style={{ fontWeight: 'bold' }}>
              Categories Screen:
            </LTText>

            <LTText>
              The Categories Screen is also accessible from the Settings 
              Screen. This screen allows the user to edit or delete any of
              their categories. Any focuses in the deleted category will 
              automatically moved into the 'Uncategorized' category. This 
              category is only visible when it contains at least one focus.
            </LTText>

            <LTSpacer />

          </View>
        </View>
      </ScrollView>
    )
  }
}


const mapStateToProps = state => ({
})


const mapDispatchToProps = dispatch => ({
})


export default connect(mapStateToProps, mapDispatchToProps)(HelpScreen)