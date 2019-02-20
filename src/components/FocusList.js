import React from 'react';
import { FlatList, View } from 'react-native';

import FocusItem from './FocusItem';

class FocusList extends React.PureComponent {
  _renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
          marginLeft: "4%", 
          marginRight: "4%",
        }}
      />
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.focuses}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => 
          <FocusItem focus={item} selectFocus={this.props.selectFocus} />
        }
        ItemSeparatorComponent={this._renderSeparator}
      />
    );
  };
};

export default FocusList;