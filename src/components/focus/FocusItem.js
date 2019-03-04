import React from 'react';
import { 
  TouchableOpacity, Text, View, ProgressViewIOS 
} from 'react-native';
import createStyles, { Color, FontSize } from '../../styles'; 

const styles = createStyles({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  itemLeft: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  name: {
    fontSize: FontSize.settingItem,
    textAlign: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  itemRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  level: {
    fontSize: FontSize.settingItem,
    textAlign: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  progress: {
    width: 54,
    marginTop: 1,
    transform: [
      { scaleX: 1.0 }, 
      { scaleY: 6.0 },
    ],
  },
});

class FocusItem extends React.Component 
{
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.container}
        onPress={() => this.props.onFocusSelect(this.props.focus.id)}
      >
        <View style={styles.itemLeft}>
          <Text style={styles.name}>
            {this.props.focus.name}
          </Text>
        </View>

        <View style={styles.itemRight} >
          <Text style={styles.level}>
            {this.props.focus.level}
          </Text>
          <ProgressViewIOS
            style={styles.progress}
            progressTintColor={Color.highlight}
            progress={this.props.focus.experience / 100}
          />
        </View>
      </TouchableOpacity>
    );
  };
};

export default FocusItem;