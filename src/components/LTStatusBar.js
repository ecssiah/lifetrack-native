import React from 'react';
import { StatusBar, View } from 'react-native';
import createStyles, { Color, Screen } from '../styles';

const styles = createStyles({
  statusBar: {
    backgroundColor: Color.primary,
    width: Screen.w,
    height: 20,
  },
});

class LTStatusBar extends React.PureComponent {
  render() {
    return (
      <View style={styles.statusBar}>
        <StatusBar barStyle="light-content" />
      </View>
    );
  };
};

export default LTStatusBar;