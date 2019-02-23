import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import createStyles from '../../styles';
import { 
  setTime, updateTime, updatePeriods, updateExperience, resetPeriods 
} from '../../actions/FocusesActions';
import {
  setWorking, setTimerActive, setTimer
} from '../../actions/FocusActions';
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
    if (this.props.focus.timerActive) {
      if (!this.props.focus.working) {
        this.props.setTime(
          this.props.focus.id, this.props.settings.workPeriod
        );
      }

      this.props.setWorking(true);
      this.props.setTimerActive(false);

      clearInterval(this.props.focus.timer);
    } else {
      this.props.setTimerActive(true);
      this.props.setTimer(setInterval(this._onFocusTimerUpdate, 1000));
    }
  };

  _onFocusTimerUpdate = () => {
    this._updateFocusTimer();
  };
  
  _updateFocusTimer = () => {
    if (this.props.focuses[this.props.focus.id].time >= SECOND) {
      this.props.updateTime(this.props.focus.id);

      if (this.props.focus.working) {
        this.props.updateExperience(this.props.focus.id);
      }

    } else {
      clearInterval(this.props.focus.timer);

      if (this.props.focus.working) {
        this.props.updatePeriods(this.props.focus.id);
        this.props.setTime(
          this.props.focus.id, this.props.settings.breakPeriod
        );
      } else {
        this.props.setTime(
          this.props.focus.id, this.props.settings.workPeriod
        );
      }

      this.props.setWorking(!this.props.focus.working);
      this.props.setTimerActive(false);
    }
  };

  _onClickGoal = () => {
    this.props.resetPeriods(this.props.focus.id);
  };

  render() {
    return (
      <View style={styles.container}>
        <FocusTitle 
          name={this.props.focuses[this.props.focus.id].name} 
        />
        <FocusTimer 
          active={this.props.focus.timerActive}
          working={this.props.focus.working} 
          time={this.props.focuses[this.props.focus.id].time} 
          onActivate={this._onActivate}
        />
        <FocusGoal 
          periods={this.props.focuses[this.props.focus.id].periods} 
          goal={this.props.settings.workGoal} 
          onClickGoal={this._onClickGoal}
        />
        <FocusLevel 
          level={this.props.focuses[this.props.focus.id].level} 
        />
        <FocusExperience 
          experience={this.props.focuses[this.props.focus.id].experience} 
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
  setWorking: working => dispatch(setWorking(working)),
  setTimerActive: timerActive => dispatch(setTimerActive(timerActive)), 
  setTimer: timer => dispatch(setTimer(timer)),
  setTime: (id, time) => dispatch(setTime(id, time)),
  updateTime: id => dispatch(updateTime(id)),
  updatePeriods: id => dispatch(updatePeriods(id)), 
  resetPeriods: id => dispatch(resetPeriods(id)),
  updateExperience: id => dispatch(updateExperience(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusScreen);