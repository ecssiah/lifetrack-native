import React from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';
import { StatusBar, View } from 'react-native';
import { updateStats } from '../../handlers/StatsHandlers';
import { onAppForeground, onAppBackground } from '../../handlers/StatusHandlers';
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

  _onAppStateChange = async nextAppState => {
    this.props.updateStats({ appState: nextAppState });

    if (!this.props.stats.newUser && !this.props.stats.timeInactive) {
      const willBeBackground = (
        this.props.stats.appState === 'active' && 
        nextAppState.match(/inactive|background/)
      );

      if (willBeBackground) {
        this.props.onAppBackground();
      }
    } 
    
    if (this.props.stats.timeInactive) {
      const willBeForeground = (
        this.props.stats.appState.match(/inactive|background/) &&
        nextAppState === 'active'
      );

      if (willBeForeground) {
        this.props.onAppForeground();
      }
    } 
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
});

const mapDispatchToProps = dispatch => ({
  onAppForeground: () => onAppForeground(dispatch),
  onAppBackground: () => onAppBackground(dispatch),
  updateStats: update => updateStats(dispatch, update),
});


export default connect(mapStateToProps, mapDispatchToProps)(LTStatus);