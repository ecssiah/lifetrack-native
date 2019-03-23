import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import createStyles, { FontSize } from '../../../styles';

import LTText from '../../../components/LT/LTText';
import { displayTime } from '../../../utils';

const styles = createStyles({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: FontSize.modalTitle,
  },
});

class StatsScreen extends React.Component 
{
  static navigationOptions = {
    title: 'Stats',
  };

  _getUntrackedLifePercentage() {
    const userTimeLeft = (80 - this.props.user.age) * 365 * 24 * 60 * 60;
    const percentageUsed = this.props.stats.untracked / userTimeLeft; 
    const formattedOutput = percentageUsed.toFixed(2) + '%';

    return formattedOutput;
  };

  render() {
    return (
      <View style={styles.container}>
        <LTText>
          Untracked Time: {displayTime(this.props.stats.untracked)}
        </LTText>

        <LTText>
          Untracked Percentage: {this._getUntrackedLifePercentage()}
        </LTText>
      </View>
    );
  };
};

const mapStateToProps = state => ({
  user: state.user,
  stats: state.stats,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen);