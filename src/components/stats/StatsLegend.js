import React from 'react'
import { ScrollView, SectionList } from 'react-native'
import { UNCATEGORIZED } from '../../constants/Categories';
import { GraphColors } from '../../constants/Stats';

import LegendItem from './LegendItem';
import FocusHeader from '../focuses/FocusHeader';


class StatsLegend extends React.Component
{
  _getList = () => {
    return this.props.keys.map((key, index) => {
      const focus = this.props.focuses[key]

      return (
        <LegendItem
          key={key}
          focus={focus}
          color={GraphColors[index]}
          onValueChange={value =>
            this.props.onFocusVisibilityChange(key, value)
          }
        />
      )
    })
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


  _renderItem = (item, index) => {
    return (
      <LegendItem
        focus={item}
        color={GraphColors[item.chartColor]}
        onValueChange={value =>
          this.props.onFocusVisibilityChange(item.id, value)
        }
      />
    )
  }


  _renderSectionHeader = section => {
    return (
      <FocusHeader 
        title={section.title} 
        active={section.statVisible}
        onCategorySelect={() => 
          this.props.onCategoryVisibilityChange(section.title)
        }
      />
    )
  }


  _sectionsReducer = (result, name) => {
    const category = this.props.categories[name]
    const section = { 
      title: name, 
      statVisible: category.statVisible, 
      data: [] 
    }

    if (name === UNCATEGORIZED) {
      const focuses = this._findCategoryFocuses(name)

      if (focuses.length > 0) {
        if (category.statVisible) {
          focuses.sort((a, b) => a.name.localeCompare(
            b.name, undefined, { numeric: true }
          ))
          result.push({ ...section, data: focuses })
        } else {
          result.push(section)
        }
      }
    } else {
      if (category.statVisible) {
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
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

    const sections = categoryNames.reduce(this._sectionsReducer, [])

    return sections
  }


  render() {
    return (
      <ScrollView>
        <SectionList
          keyExtractor={(item, index) => index}
          renderItem={({item, index}) => this._renderItem(item, index)} 
          renderSectionHeader={({section}) => 
            this._renderSectionHeader(section)
          }
          sections={this._getSections()}
        />
      </ScrollView>
    )
  }
}

export default StatsLegend