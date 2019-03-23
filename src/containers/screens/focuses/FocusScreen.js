import React from 'react';
import { getElapsed } from '../../../utils';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { EXP_PER_SECOND } from '../../../constants/Focuses';
import { INC_TRACKED, DEC_TRACKED } from '../../../constants/Status';
import { updateFocus } from '../../../handlers/FocusesHandlers';
import { updateStats, updateUntracked } from '../../../handlers/StatsHandlers';
import createStyles from '../../../styles';

import LTIcon from '../../../components/LT/LTIcon';
import FocusTitle from '../../../components/focuses/FocusTitle';
import FocusTimer from '../../../components/focuses/FocusTimer';
import FocusGoal from '../../../components/focuses/FocusGoal';
import FocusExperience from '../../../components/focuses/FocusExperience';
import { updateUser } from '../../../handlers/UserHandlers';

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

  _onActivate = async () => {
    const update = {};
    const focus = this.props.focuses[this.props.selection.id];

    if (focus.active) {
      clearInterval(focus.timer);

      if (focus.working) {
        update.active = false;

        if (this.props.status.tracked === 1) {
          this.props.updateStats({ inactiveStart: Date.now() });
        }

        this.props.decTracked();
      } else {
        update.working = true;
        update.time = focus.workPeriod * 60;
        update.timer = setInterval(this._updateTimer, 1000);
      }
    } else {
      update.timer = setInterval(this._updateTimer, 1000);

      if (focus.working) {
        update.active = true;

        if (this.props.status.tracked === 0 && this.props.stats.inactiveStart) {
          const elapsed = getElapsed(this.props.stats.inactiveStart);

          await this.props.updateUntracked(elapsed); 
          await this.props.updateStats({ inactiveStart: null });
        }

        this.props.incTracked();
      } 
    }

    this.props.updateFocus(this.props.selection.id, update); 
  };

  _updateTimer = () => {
    const update = {};
    const focus = this.props.focuses[this.props.selection.id];

    if (focus.time > 0) {
      update.time = focus.time - 1;

      if (focus.working) {
        update.experience = focus.experience + EXP_PER_SECOND;

        if (update.experience >= 100) {
          update.level = focus.level + 1;
          update.experience -= 100;
        }
      }
    } else {
      if (focus.working) {
        update.working = false;
        update.periods = focus.periods + 1;
        update.time = focus.breakPeriod * 60;
      } else {
        update.working = true;
        update.time = focus.workPeriod * 60;
      }
    }

    this.props.updateFocus(this.props.selection.id, update);
  };

  _onGoalPress = () => {
    this.props.updateFocus(this.props.selection.id, { periods: 0 });
  };

  render() {
    const focus = this.props.focuses[this.props.selection.id];

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
          onGoalPress={this._onGoalPress}
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
  status: state.status,
  user: state.user,
  stats: state.stats,
  settings: state.settings,
  selection: state.selection,
  focuses: state.focuses,
});

const mapDispatchToProps = dispatch => ({
  incTracked: () => dispatch({ type: INC_TRACKED }),
  decTracked: () => dispatch({ type: DEC_TRACKED }),
  updateUser: update => updateUser(dispatch, update),
  updateStats: update => updateStats(dispatch, update),
  updateUntracked: elapsed => updateUntracked(dispatch, elapsed),
  updateFocus: (id, update) => updateFocus(dispatch, id, update),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusScreen);