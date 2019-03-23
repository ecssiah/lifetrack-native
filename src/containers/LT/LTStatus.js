import React from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';
import { StatusBar, View } from 'react-native';
import { UPDATE_STATUS } from '../../constants/Status';
import { updateActiveFocuses } from '../../handlers/StatsHandlers';
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
    AppState.addEventListener('change', this._onAppStateChange);
  };

  componentWillUnmount() {
    AppState.removeEventListener('change', this._onAppStateChange);
  };

  _onAppStateChange = nextAppState => {
    if (nextAppState.match(/inactive|background/)) {
      this.props.updateStatus({ activeStart: Date.now() });
    }

    const willBeForeground = (
      this.props.status.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    );

    if (willBeForeground) {
      this.props.updateActiveFocuses(this.props.status.activeStart);
    }

    this.props.updateStatus({ appState: nextAppState });
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
  status: state.status,
  user: state.user,
  stats: state.stats,
});

const mapDispatchToProps = dispatch => ({
  updateStatus: update => dispatch({ type: UPDATE_STATUS, update }),
  updateActiveFocuses: start => updateActiveFocuses(dispatch, start),
});

export default connect(mapStateToProps, mapDispatchToProps)(LTStatus);