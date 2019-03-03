import React from 'react';
import { 
  TouchableHighlight, TouchableOpacity, Text, View, ProgressViewIOS 
} from 'react-native';
import createStyles, { Color, FontSize } from '../styles'; 

const styles = createStyles({
  focusContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  focusItemLeft: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  focusName: {
    fontSize: FontSize.settingItem,
    textAlign: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  focusItemRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  focusLevel: {
    fontSize: FontSize.settingItem,
    textAlign: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  focusProgress: {
    width: 54,
    marginTop: 1,
    transform: [
      { scaleX: 1.0 }, 
      { scaleY: 6.0 },
    ],
  },
});

class FocusItem extends React.Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.focusContainer}
        onPress={() => this.props.selectFocus(this.props.focus.id)}
      >
        <View style={styles.focusItemLeft}>
          <Text style={styles.focusName}>
            {this.props.focus.name}
          </Text>
        </View>

        <View style={styles.focusItemRight} >
          <Text style={styles.focusLevel}>
            {this.props.focus.level}
          </Text>
          <ProgressViewIOS
            style={styles.focusProgress}
            progressTintColor={Color.highlight}
            progress={this.props.focus.experience / 100.0}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default FocusItem;