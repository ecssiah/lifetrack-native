import React from 'react'
import { FlatList } from 'react-native'
import { UNCATEGORIZED } from '../../constants/Categories'

import LTSeparator from '../LT/LTSeparator'
import SettingItem from './SettingItem'

class CategoryList extends React.Component 
{
  _renderItem = item => (
    <SettingItem 
      setting={item} 
      onSettingSelect={this.props.onCategorySelect} 
    />
  )

  _getCategoryData = () => {
    const categoryNames = Object.keys(this.props.categories)

    const data = categoryNames.filter(name => {
      return name !== UNCATEGORIZED
    }).sort((a, b) => {
      return a.localeCompare(b)
    }).map(name => {
      return { name, value: '' }
    })

    return data
  }

  render() {
    return (
      <FlatList
        data={this._getCategoryData()}
        keyExtractor={(item, index) => item.name + index}
        ItemSeparatorComponent={LTSeparator}
        renderItem={({item}) => this._renderItem(item)}
      />
    )
  }
}

export default CategoryList