import React from 'react';
import { AppState, Alert } from 'react-native';
import { connect } from 'react-redux';
import { StatusBar, View } from 'react-native';
import { 
  activateApp, 
  setAppState, 
  setTimeInactive 
} from '../../handlers/StatusHandlers';
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
    const isInactive = this.props.status.appState.match(/inactive|background/);

    if (isInactive && nextAppState === 'active') {
      this.props.activateApp(this.props.status.timeInactive);
    } 
    
    if (this.props.status.appState === 'active' && willBeInactive) {
      this.props.setTimeInactive();
    }

    this.props.setAppState(nextAppState);
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
});

const mapDispatchToProps = dispatch => ({
  activateApp: timeInactive => activateApp(dispatch, timeInactive),
  setAppState: appState => setAppState(dispatch, appState),
  setTimeInactive: () => setTimeInactive(dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(LTStatus);