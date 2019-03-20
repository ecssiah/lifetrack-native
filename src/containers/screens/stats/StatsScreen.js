import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import createStyles from '../../../styles';

import LTText from '../../../components/LT/LTText';

const styles = createStyles({
});

class StatsScreen extends React.Component 
{
  static navigationOptions = {
    title: 'Stats',
  };

  render() {
    return (
      <View style={styles.container}>
        <LTText>
          {this.props.stats.untracked}
        </LTText>
      </View>
    );
  };
};

const mapStateToProps = state => ({
  stats: state.stats,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(StatsScreen);