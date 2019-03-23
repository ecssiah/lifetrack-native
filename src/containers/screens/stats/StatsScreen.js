import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { displayTime } from '../../../utils';
import { LIFE_EXPECTANCY, SECONDS_IN_YEAR } from '../../../constants/User';
import createStyles from '../../../styles';

import LTText from '../../../components/LT/LTText';

const styles = createStyles({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainText: {
    fontSize: 22,
  },
});

class StatsScreen extends React.Component 
{
  static navigationOptions = {
    title: 'Stats',
  };

  _getUntrackedLifePercentage() {
    if (isNaN(this.props.user.birthYear)) {
      return 'Birth Year Unset';
    } else {
      const currentYear = new Date().getFullYear();
      const userAge = currentYear - parseInt(this.props.user.birthYear);
      const secondsLeft = (LIFE_EXPECTANCY - userAge) * SECONDS_IN_YEAR;
      const percentageUsed = this.props.stats.untracked / secondsLeft; 

      return percentageUsed.toFixed(2) + '%';
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <LTText style={styles.mainText}>
          Untracked Time: {displayTime(this.props.stats.untracked)}
        </LTText>

        <LTText style={styles.mainText}>
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