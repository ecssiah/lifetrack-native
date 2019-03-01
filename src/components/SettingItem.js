import React from 'react';
import { 
  TouchableOpacity, Text, View, ProgressViewIOS 
} from 'react-native';
import createStyles, { Colors } from '../styles'; 

const styles = createStyles({
  settingContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginVertical: 10,
  },
  settingItemLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    fontSize: 20,
    color: Colors.text,
  },
  settingItemRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  settingName: {
    fontSize: 20,
    alignItems: 'center',
    marginRight: 10,
  },
  settingValue: {
    fontSize: 20,
    alignItems: 'center',
    marginRight: 10,
  },
});

class SettingItem extends React.Component {
  render() {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.settingContainer}
        onPress={() => this.props.selectSetting(this.props.setting.name)}
      >
        <View style={styles.settingItemLeft}>
          <Text style={styles.settingName}>
            {this.props.setting.name}
          </Text>
        </View>

        <View style={styles.settingItemRight} >
          <Text style={styles.settingValue}>
            {this.props.setting.value}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default SettingItem;