import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { 
  updateFocus, 
  activateFocus
} from '../../../handlers/FocusesHandlers';
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
    const focus = {...this.props.focuses[this.props.focus.id]};

    this.props.activateFocus(this.props.focus.id, focus);
  };

  _onGoalClick = () => {
    const focus = {...this.props.focuses[this.props.focus.id]};

    focus.periods = 0;

    this.props.updateFocus(this.props.focus.id, focus);
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
  activateFocus: (id, focus) => activateFocus(dispatch, id, focus),
  updateFocus: (id, focus) => updateFocus(dispatch, id, focus),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusScreen);