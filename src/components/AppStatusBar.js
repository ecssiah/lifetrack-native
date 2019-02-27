import React from 'react';
import { StatusBar, View } from 'react-native';
import createStyles, { Colors, Screen } from '../styles';

const styles = createStyles({
  statusBar: {
    backgroundColor: Colors.primary,
    width: Screen.w,
    height: 20,
  },
});

class AppStatusBar extends React.PureComponent {
  render() {
    return (
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" />
      </View>
    );
  };
};

export default AppStatusBar;