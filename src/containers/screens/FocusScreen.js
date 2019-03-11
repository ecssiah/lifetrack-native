import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { 
  setTime, updateTime, updatePeriods, updateExperience, resetPeriods,
  setWorking, setActive, setTimer
} from '../../actions/FocusesActions';
import { SECOND } from '../../reducers/FocusesReducer';
import createStyles from '../../styles';

import LTIcon from '../../components/LT/LTIcon';

import FocusTitle from '../../components/focus/FocusTitle';
import FocusTimer from '../../components/focus/FocusTimer';
import FocusGoal from '../../components/focus/FocusGoal';
import FocusExperience from '../../components/focus/FocusExperience';

const styles = createStyles({ 
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

class FocusScreen extends React.Component 
{
  static navigationOptions = ({ navigation }) => ({
    title: 'Focus',
    headerLeft: (
      <LTIcon
        type='ios-arrow-back'
        size={32}
        onPress={() => navigation.goBack()}
      />
    ),
    headerRight: (
      <LTIcon
        type='md-create'
        size={26}
        onPress={() => navigation.navigate('FocusEdit')}
      />
    ),
  });

  _onActivate = () => {
    const focus = this.props.focuses[this.props.focus.id];

    if (focus.active) {
      if (!focus.working) {
        this.props.setTime(this.props.focus.id, focus.workPeriod);
      }

      this.props.setWorking(this.props.focus.id, true);
      this.props.setActive(this.props.focus.id, false);

      clearInterval(focus.timer);
    } else {
      this.props.setActive(this.props.focus.id, true);
      this.props.setTimer(
        this.props.focus.id, setInterval(this._updateTimer, 1000)
      );
    }
  };

  _onGoalClick = () => {
    this.props.resetPeriods(this.props.focus.id);
  };

  _updateTimer = () => {
    const focus = this.props.focuses[this.props.focus.id];

    if (focus.time >= SECOND) {
      this.props.updateTime(this.props.focus.id);

      if (focus.working) {
        this.props.updateExperience(this.props.focus.id);
      }
    } else {
      clearInterval(focus.timer);

      if (focus.working) {
        this.props.updatePeriods(this.props.focus.id);
        this.props.setTime(
          this.props.focus.id, focus.breakPeriod
        );
      } else {
        this.props.setTime(
          this.props.focus.id, focus.workPeriod
        );
      }

      this.props.setWorking(this.props.focus.id, !focus.working);
      this.props.setActive(this.props.focus.id, false);
    }
  };

  render() {
    const focus = this.props.focuses[this.props.focus.id];

    if (!focus) return null;

    return (
      <View style={styles.container}>
        <FocusTitle 
          name={focus.name} 
        />
        <FocusTimer 
          active={focus.active}
          working={focus.working} 
          time={focus.time} 
          onActivate={this._onActivate}
        />
        <FocusGoal 
          periods={focus.periods} 
          goal={focus.workGoal} 
          onGoalClick={this._onGoalClick}
        />
        <FocusExperience 
          level={focus.level}
          experience={focus.experience} 
        />
      </View>
    );
  };
};

const mapStateToProps = state => ({
  focus: state.focus,
  focuses: state.focuses,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setWorking: (id, working) => dispatch(setWorking(id, working)),
  setActive: (id, active) => dispatch(setActive(id, active)), 
  setTimer: (id, timer) => dispatch(setTimer(id, timer)),
  setTime: (id, time) => dispatch(setTime(id, time)),
  updateTime: id => dispatch(updateTime(id)),
  updatePeriods: id => dispatch(updatePeriods(id)), 
  resetPeriods: id => dispatch(resetPeriods(id)),
  updateExperience: id => dispatch(updateExperience(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusScreen);