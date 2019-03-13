import React from 'react';
import { FlatList } from 'react-native';

import LTSeparator from '../LT/LTSeparator';
import SettingItem from './SettingItem';

class CategoryList extends React.Component 
{
  _renderItem = item => (
    <SettingItem 
      setting={item} 
      onSettingSelect={this.props.onCategorySelect} 
    />
  );

  render() {
    return (
      <FlatList
        data={this.props.categoryData}
        keyExtractor={(item, index) => item.name + index}
        ItemSeparatorComponent={LTSeparator}
        renderItem={({item}) => this._renderItem(item)}
      />
    );
  };
};

export default CategoryList;