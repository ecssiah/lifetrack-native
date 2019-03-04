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
    marginHorizontal: 16,
    marginVertical: 10,
  },
  itemLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  settingName: {
    fontSize: FontSize.settingItem,
    alignItems: 'center',
    marginRight: 10,
  },
  itemRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  settingValue: {
    fontSize: FontSize.settingItem,
    alignItems: 'center',
  },
});

class SettingItem extends React.Component 
{
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.container}
        onPress={() => this.props.onSettingSelect(this.props.setting.name)}
      >
        <View style={styles.itemLeft}>
          <Text style={styles.settingName}>
            {this.props.setting.name}
          </Text>
        </View>

        <View style={styles.itemRight} >
          <Text style={styles.settingValue}>
            {this.props.setting.value}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
};

export default SettingItem;