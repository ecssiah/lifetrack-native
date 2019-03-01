import React from 'react';
import { FlatList, SectionList, View } from 'react-native';
import createStyles from '../styles';

import FocusHeader from './FocusHeader';
import FocusItem from './FocusItem';

const styles = createStyles({
  focusSeparator: {
    height: 1,
    backgroundColor: '#ced0ce',
    marginHorizontal: '3%',
  },
});

class FocusList extends React.Component {
  _renderSeparator = () => (
    <View style={styles.focusSeparator} />
  );

  _renderItem = item => (
    <FocusItem 
      focus={item} 
      selectFocus={this.props.selectFocus} 
    />
  );

  _renderSectionHeader = section => (
    <FocusHeader 
      title={section.title} 
    />
  ); 

  render() {
    return (
      <SectionList
        sections={this.props.sections}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={this._renderSeparator}
        renderItem={({item}) => this._renderItem(item)}
        renderSectionHeader={({section}) => this._renderSectionHeader(section)}
      />
    );
  };
};

export default FocusList;