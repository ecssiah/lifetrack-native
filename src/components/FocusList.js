import React from 'react';
import { SectionList } from 'react-native';

import LTSeparator from './LTSeparator';
import FocusHeader from './FocusHeader';
import FocusItem from './FocusItem';

class FocusList extends React.Component {
  _renderHeader = section => {
    return (
      <FocusHeader 
        title={section.title} 
        active={section.show}
        onCategorySelect={this.props.onCategorySelect}
      />
    );
  }; 

  _renderItem = item => {
    return (
      <FocusItem 
        focus={item} 
        onFocusSelect={this.props.onFocusSelect} 
      />
    );
  };

  render() {
    return (
      <SectionList
        sections={this.props.sections}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={LTSeparator}
        renderSectionHeader={({section}) => this._renderHeader(section)}
        renderItem={({item}) => this._renderItem(item)}
      />
    );
  };
};

export default FocusList;