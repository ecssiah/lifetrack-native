import React from 'react';
import { SectionList, View } from 'react-native';
import createStyles from '../styles';

import SettingItem from './SettingItem';
import SettingHeader from './SettingHeader';

const styles = createStyles({
  settingSeparator: {
    height: 1,
    backgroundColor: '#ced0ce',
    marginHorizontal: '3%',
  },
});

class SettingList extends React.Component {
  _renderSeparator = () => (
    <View style={styles.settingSeparator} />
  );

  _renderItem = item => (
    <SettingItem 
      setting={item} 
      onSettingSelect={this.props.onSettingSelect} 
    />
  );

  _renderHeader = section => (
    <SettingHeader 
      title={section.title} 
    />
  ); 

  render() {
    return (
      <SectionList
        sections={this.props.sections}
        keyExtractor={(item, index) => item.name + index}
        renderItem={({item}) => this._renderItem(item)}
        renderSectionHeader={({section}) => this._renderHeader(section)}
        ItemSeparatorComponent={this._renderSeparator}
      />
    );
  };
};

export default SettingList;