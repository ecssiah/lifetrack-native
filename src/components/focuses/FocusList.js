import React from 'react'
import { SectionList } from 'react-native'
import { UNCATEGORIZED } from '../../constants/Categories'

import FocusHeader from './FocusHeader'
import FocusItem from './FocusItem'
import LTSeparator from '../LT/LTSeparator'

class FocusList extends React.Component 
{
  _renderHeader = section => {
    return (
      <FocusHeader 
        title={section.title} 
        active={section.show}
        onCategorySelect={this.props.onCategorySelect}
      />
    )
  } 

  _renderItem = item => {
    return (
      <FocusItem 
        focus={item} 
        onFocusSelect={this.props.onFocusSelect} 
      />
    )
  }

  _findCategoryFocuses = name => {
    const focuses = []

    for (const id in this.props.focuses) {
      if (this.props.focuses[id].category === name) {
        focuses.push({ id, ...this.props.focuses[id] })
      }
    }

    return focuses
  }

  _sectionsReducer = (result, name) => {
    const category = this.props.categories[name]
    const section = { title: name, show: category.show, data: [] }

    if (name === UNCATEGORIZED) {
      const focuses = this._findCategoryFocuses(name)

      if (focuses.length > 0) {
        if (category.show) {
          focuses.sort((a, b) => a.name.localeCompare(
            b.name, undefined, { numeric: true }
          ))
          result.push({ ...section, data: focuses })
        } else {
          result.push(section)
        }
      }
    } else {
      if (category.show) {
        const focuses = this._findCategoryFocuses(name)

        focuses.sort((a, b) => a.name.localeCompare(
          b.name, undefined, { numeric: true }
        ))
        result.push({ ...section, data: focuses })
      } else {
        result.push(section)
      }
    }

    return result
  }

  _getSections = () => {
    const categoryNames = Object.keys(this.props.categories)
      .filter(name => name !== UNCATEGORIZED)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

    categoryNames.push(UNCATEGORIZED)

    return categoryNames.reduce(this._sectionsReducer, [])
  }


  render() {
    return (
      <SectionList
        sections={this._getSections()}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={LTSeparator}
        renderSectionHeader={({section}) => this._renderHeader(section)}
        renderItem={({item}) => this._renderItem(item)}
      />
    )
  }
}

export default FocusList