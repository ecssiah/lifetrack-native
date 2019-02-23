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
    if (this.props.focuses[this.props.focusId].timerActive) {
      if (!this.props.focuses[this.props.focusId].working) {
        this.props.setTime(
          this.props.focusId, this.props.settings.workPeriod
        );
      }

      this.props.setWorking(this.props.focusId, true);
      this.props.setTimerActive(this.props.focusId, false);

      clearInterval(this.props.focuses[this.props.focusId].timer);
    } else {
      this.props.setTimerActive(this.props.focusId, true);
      this.props.setTimer(this.props.focusId, setInterval(this._onFocusTimerUpdate, 1000));
    }
  };

  _onFocusTimerUpdate = () => {
    this._updateFocusTimer();
  };
  
  _updateFocusTimer = () => {
    if (this.props.focuses[this.props.focusId].time >= SECOND) {
      this.props.updateTime(this.props.focusId);

      if (this.props.focuses[this.props.focusId].working) {
        this.props.updateExperience(this.props.focusId);
      }

    } else {
      clearInterval(this.props.focuses[this.props.focusId].timer);

      if (this.props.focuses[this.props.focusId].working) {
        this.props.updatePeriods(this.props.focusId);
        this.props.setTime(
          this.props.focusId, this.props.settings.breakPeriod
        );
      } else {
        this.props.setTime(
          this.props.focusId, this.props.settings.workPeriod
        );
      }

      this.props.setWorking(this.props.focusId, !this.props.focuses[this.props.focusId].working);
      this.props.setTimerActive(this.props.focusId, false);
    }
  };

  _onClickGoal = () => {
    this.props.resetPeriods(this.props.focusId);
  };

  render() {
    return (
      <View style={styles.container}>
        <FocusTitle 
          name={this.props.focuses[this.props.focusId].name} 
        />
        <FocusTimer 
          active={this.props.focuses[this.props.focusId].timerActive}
          working={this.props.focuses[this.props.focusId].working} 
          time={this.props.focuses[this.props.focusId].time} 
          onActivate={this._onActivate}
        />
        <FocusGoal 
          periods={this.props.focuses[this.props.focusId].periods} 
          goal={this.props.settings.workGoal} 
          onClickGoal={this._onClickGoal}
        />
        <FocusLevel 
          level={this.props.focuses[this.props.focusId].level} 
        />
        <FocusExperience 
          experience={this.props.focuses[this.props.focusId].experience} 
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  focusId: state.focusId,
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