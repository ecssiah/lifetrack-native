import React from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';
import { StatusBar, View } from 'react-native';
import { activateApp } from '../../handlers/StatusHandlers';
import { updateStats } from '../../handlers/StatsHandlers';
import createStyles, { Color, Screen } from '../../styles';

const styles = createStyles({
  statusBar: {
    height: 20,
    width: Screen.w,
    backgroundColor: Color.primary,
  },
});

class LTStatus extends React.Component 
{
  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  };

  _handleAppStateChange = nextAppState => {
    const willBeInactive = nextAppState.match(/inactive|background/);
    const isInactive = this.props.stats.appState.match(/inactive|background/);

    let update = {
      appState: nextAppState,
    };

    if (isInactive && nextAppState === 'active') {
      this.props.activateApp();
    } 
    
    if (this.props.stats.appState === 'active' && willBeInactive) {
      update.timeInactive = Date.now();
    }

    this.props.updateStats(update);
  };

  render() {
    return (
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" />
      </View>
    );
  };
};

const mapStateToProps = state => ({
  stats: state.stats,
  status: state.status,
});

const mapDispatchToProps = dispatch => ({
  activateApp: timeInactive => activateApp(dispatch, timeInactive),
  updateStats: update => updateStats(dispatch, update),
});


export default connect(mapStateToProps, mapDispatchToProps)(LTStatus);