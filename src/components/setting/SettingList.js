import React from 'react';
import { SectionList } from 'react-native';

import SettingItem from './SettingItem';
import SettingHeader from './SettingHeader';
import LTSeparator from '../LT/LTSeparator';

class SettingList extends React.Component 
{
  _renderHeader = section => (
    <SettingHeader 
      title={section.title} 
    />
  ); 

  _renderItem = item => (
    <SettingItem 
      setting={item} 
      onSettingSelect={this.props.onSettingSelect} 
    />
  );

  render() {
    return (
      <SectionList
        sections={this.props.sectionData}
        keyExtractor={(item, index) => item.name + index}
        ItemSeparatorComponent={LTSeparator}
        renderSectionHeader={({section}) => this._renderHeader(section)}
        renderItem={({item}) => this._renderItem(item)}
      />
    );
  };
};

export default SettingList;