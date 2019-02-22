import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import createStyles from '../../styles';
import { 
  setTime, updateTime, updatePeriods, updateExperience, resetPeriods 
} from '../../actions/FocusesActions';
import { SECOND } from '../../reducers/FocusIDReducer';

import FocusTitle from '../../components/FocusTitle';
import FocusTimer from '../../components/FocusTimer';
import FocusButton from '../../components/FocusButton';
import FocusGoal from '../../components/FocusGoal';
import FocusLevel from '../../components/FocusLevel';
import FocusExperience from '../../components/FocusExperience';

const styles = createStyles();

class FocusScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      working: true,
      timer: null,
      timerActive: false,
      buttonText: 'Start',
    };
  }

  _onClickStart = () => {
    this._handleStartEvent();
  };

  _handleStartEvent = () => {
    if (this.state.timerActive) {
      clearInterval(this.state.timer);

      if (this.state.working) {
        this.setState({
          ...this.state,
          timerActive: false,
          buttonText: 'Start',
        });
      } else {
        this.props.setTime(this.props.focusID, this.props.settings.workPeriod);

        this.setState({
          ...this.state,
          working: true,
          timerActive: true,
          buttonText: 'Start',
        });
      }
    } else {
      this.setState({
        ...this.state,
        timerActive: true,
        timer: setInterval(this._onFocusTimerUpdate, 1000),
        buttonText: this.state.working ? 'Pause' : 'Skip',
      });
    }
  };

  _onFocusTimerUpdate = () => {
    this._updateFocusTimer();
  };
  
  _updateFocusTimer = () => {
    if (this.props.focuses[this.props.focusID].time >= SECOND) {
      this.props.updateTime(this.props.focusID);

      if (this.state.working) {
        this.props.updateExperience(this.props.focusID);
      }
    } else {
      clearInterval(this.state.timer);

      if (this.state.working) {
        this.props.updatePeriods(this.props.focusID);
        this.props.setTime(this.props.focusID, this.props.settings.breakPeriod);
      } else {
        this.props.setTime(this.props.focusID, this.props.settings.workPeriod);
      }

      this.setState({
        working: !this.state.working,
        timerActive: false,
        buttonText: 'Start',
      });
    }
  };

  _onClickGoal = () => {
    this.props.resetPeriods(this.props.focusID);
  };

  render() {
    return (
      <View style={styles.container}>
        <FocusTitle 
          name={this.props.focuses[this.props.focusID].name} 
        />
        <FocusTimer 
          active={this.state.working} 
          time={this.props.focuses[this.props.focusID].time} 
          onClickStart={this._onClickStart}
        />
        <FocusButton 
          text={this.state.buttonText} 
          onClickStart={this._onClickStart} 
        />
        <FocusGoal 
          periods={this.props.focuses[this.props.focusID].periods} 
          goal={this.props.settings.workGoal} 
          onClickGoal={this._onClickGoal}
        />
        <FocusLevel 
          level={this.props.focuses[this.props.focusID].level} 
        />
        <FocusExperience 
          experience={this.props.focuses[this.props.focusID].experience} 
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  focusID: state.focusID,
  focuses: state.focuses,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  setTime: (id, time) => dispatch(setTime(id, time)),
  updateTime: id => dispatch(updateTime(id)),
  updatePeriods: id => dispatch(updatePeriods(id)), 
  resetPeriods: id => dispatch(resetPeriods(id)),
  updateExperience: id => dispatch(updateExperience(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusScreen);