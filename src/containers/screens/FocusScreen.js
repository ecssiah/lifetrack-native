import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import createStyles from '../../styles';
import { 
  setTime, updateTime, updatePeriods, updateExperience, resetPeriods,
  setWorking, setTimerActive, setTimer
} from '../../actions/FocusesActions';
import { SECOND } from '../../reducers/FocusesReducer';

import FocusTitle from '../../components/FocusTitle';
import FocusTimer from '../../components/FocusTimer';
import FocusGoal from '../../components/FocusGoal';
import FocusLevel from '../../components/FocusLevel';
import FocusExperience from '../../components/FocusExperience';

const styles = createStyles();

class FocusScreen extends React.Component {
  constructor(props) {
    super(props);
  };

  _onActivate = () => {
    this._handleActivateEvent();
  };

  _handleActivateEvent = () => {
    const focus = this.props.focuses[this.props.focus.id];

    if (focus.timerActive) {
      if (!focus.working) {
        this.props.setTime(
          this.props.focus.id, this.props.settings.workPeriod
        );
      }

      this.props.setWorking(this.props.focus.id, true);
      this.props.setTimerActive(this.props.focus.id, false);

      clearInterval(focus.timer);
    } else {
      this.props.setTimerActive(this.props.focus.id, true);
      this.props.setTimer(
        this.props.focus.id, setInterval(this._onFocusTimerUpdate, 1000)
      );
    }
  };

  _onFocusTimerUpdate = () => {
    this._updateFocusTimer();
  };
  
  _updateFocusTimer = () => {
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
          this.props.focus.id, this.props.settings.breakPeriod
        );
      } else {
        this.props.setTime(
          this.props.focus.id, this.props.settings.workPeriod
        );
      }

      this.props.setWorking(this.props.focus.id, !focus.working);
      this.props.setTimerActive(this.props.focus.id, false);
    }
  };

  _onClickGoal = () => {
    this.props.resetPeriods(this.props.focus.id);
  };

  render() {
    const focus = this.props.focuses[this.props.focus.id];

    return (
      <View style={styles.container}>
        <FocusTitle 
          name={focus.name} 
        />
        <FocusTimer 
          active={focus.timerActive}
          working={focus.working} 
          time={focus.time} 
          onActivate={this._onActivate}
        />
        <FocusGoal 
          periods={focus.periods} 
          goal={this.props.settings.workGoal} 
          onClickGoal={this._onClickGoal}
        />
        <FocusLevel 
          level={focus.level} 
        />
        <FocusExperience 
          experience={focus.experience} 
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  focus: state.focus,
  focuses: state.focuses,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setWorking: (id, working) => dispatch(setWorking(id, working)),
  setTimerActive: (id, timerActive) => dispatch(setTimerActive(id, timerActive)), 
  setTimer: (id, timer) => dispatch(setTimer(id, timer)),
  setTime: (id, time) => dispatch(setTime(id, time)),
  updateTime: id => dispatch(updateTime(id)),
  updatePeriods: id => dispatch(updatePeriods(id)), 
  resetPeriods: id => dispatch(resetPeriods(id)),
  updateExperience: id => dispatch(updateExperience(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusScreen);