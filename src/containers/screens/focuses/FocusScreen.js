import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { 
  updateFocus, 
} from '../../../handlers/FocusesHandlers';
import { incTracked, decTracked } from '../../../handlers/StatusHandlers';
import { EXPERIENCE_PER_SECOND } from '../../../constants/Focuses';
import createStyles from '../../../styles';

import LTIcon from '../../../components/LT/LTIcon';
import FocusTitle from '../../../components/focuses/FocusTitle';
import FocusTimer from '../../../components/focuses/FocusTimer';
import FocusGoal from '../../../components/focuses/FocusGoal';
import FocusExperience from '../../../components/focuses/FocusExperience';

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
    let updateFields = {};
    const focus = this.props.focuses[this.props.focus.id];

    if (focus.active) {
      if (focus.working) {
        updateFields.active = false;

        clearInterval(focus.timer);

        this.props.decTracked(this.props.status);
      } else {
        updateFields.working = true;
        updateFields.time = focus.workPeriod * 60;
      }
    } else {
      if (focus.working) {
        updateFields.active = true;
        this.props.incTracked(this.props.status);
      } 

      updateFields.timer = setInterval(this._updateTimer, 1000);
    }

    this.props.updateFocus(this.props.focus.id, updateFields); 
  };

  _updateTimer = () => {
    let updateFields = {};
    const focus = this.props.focuses[this.props.focus.id];

    if (focus.time > 0) {
      updateFields.time = focus.time - 1;

      if (focus.working) {
        updateFields.experience = focus.experience + EXPERIENCE_PER_SECOND;

        if (updateFields.experience >= 100) {
          updateFields.level = focus.level + 1;
          updateFields.experience -= 100;
        }
      }
    } else {
      if (focus.working) {
        updateFields.working = false;
        updateFields.periods = focus.periods + 1;
        updateFields.time = focus.breakPeriod * 60;
      } else {
        updateFields.working = true;
        updateFields.time = focus.workPeriod * 60;
      }
    }

    this.props.updateFocus(this.props.focus.id, updateFields);
  };

  _onGoalClick = () => {
    this.props.updateFocus(this.props.focus.id, { periods: 0 });
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
  status: state.status,
  focus: state.focus,
  focuses: state.focuses,
  settings: state.settings,
  stats: state.stats,
});

const mapDispatchToProps = dispatch => ({
  updateFocus: (id, updateFields) => updateFocus(dispatch, id, updateFields),
  incTracked: status => incTracked(dispatch, status),
  decTracked: status => decTracked(dispatch, status),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusScreen);