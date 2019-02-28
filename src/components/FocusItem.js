import React from 'react';
import { 
  TouchableHighlight, TouchableOpacity, Text, View, ProgressViewIOS 
} from 'react-native';
import createStyles, { Colors } from '../styles'; 

const styles = createStyles({
  focusContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  focusItemLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 20,
    color: Colors.text,
  },
  focusLevel: {
    fontSize: 20,
    alignItems: 'center',
    marginRight: 10,
  },
  focusItemRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  focusProgress: {
    width: 80,
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
        style={styles.focusContainer}
        onPress={() => this.props.selectFocus(this.props.focus.id)}
      >
        <Text style={styles.focusItemLeft}>{this.props.focus.name}</Text>

        <View style={styles.focusItemRight} >
          <Text style={styles.focusLevel}>
            {this.props.focus.level}
          </Text>
          <ProgressViewIOS
            style={styles.focusProgress}
            progressTintColor={Colors.primary}
            progress={this.props.focus.experience / 100.0}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

export default FocusItem;