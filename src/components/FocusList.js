import React from 'react';
import { SectionList, View } from 'react-native';
import createStyles from '../styles';

import FocusHeader from './FocusHeader';
import FocusItem from './FocusItem';

const styles = createStyles({
  separator: {
    height: 1,
    backgroundColor: '#ced0ce',
    marginHorizontal: '3%',
  },
});

class FocusList extends React.Component {
  _renderSeparator = () => (
    <View style={styles.separator} />
  );

  _renderItem = item => {
    return (
      <FocusItem 
        focus={item} 
        onFocusSelect={this.props.onFocusSelect} 
      />
    );
  };

  _renderHeader = section => {
    return (
      <FocusHeader 
        title={section.title} 
        active={section.show}
        onCategorySelect={this.props.onCategorySelect}
      />
    );
  }; 

  render() {
    return (
      <SectionList
        sections={this.props.sections}
        keyExtractor={(item, index) => index}
        ItemSeparatorComponent={this._renderSeparator}
        renderItem={({item}) => this._renderItem(item)}
        renderSectionHeader={({section}) => this._renderHeader(section)}
      />
    );
  };
};

export default FocusList;