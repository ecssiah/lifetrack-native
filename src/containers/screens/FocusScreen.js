import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import createStyles from '../../styles';
import FocusTitle from '../../components/FocusTitle';
import FocusTimer from '../../components/FocusTimer';
import FocusLevel from '../../components/FocusLevel';
import FocusExperience from '../../components/FocusExperience';
import FocusButton from '../../components/FocusButton';
import FocusGoal from '../../components/FocusGoal';

const styles = createStyles();

class FocusScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focus: {},
    }

    props.navigation.addListener(
      'willFocus',
      this._updateFocus,
    );
  }

  _updateFocus = () => {
    const focus = this.props.focuses.find(
      focus => focus.id === this.props.selection
    );

    this.setState({
      focus,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <FocusTitle name={this.state.focus.name} />
        <FocusTimer />
        <FocusButton />
        <FocusGoal />
        <FocusLevel />
        <FocusExperience />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  selection: state.selection,
  focuses: state.focuses,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(FocusScreen);