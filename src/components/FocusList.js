import React from 'react';
import { FlatList, View } from 'react-native';
import createStyles from '../styles';

import FocusItem from './FocusItem';

const styles = createStyles({
  separator: {
    height: 1,
    backgroundColor: "#CED0CE",
    marginLeft: "4%", 
    marginRight: "4%",
  },
});

class FocusList extends React.PureComponent {
  _renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.focuses}
        keyExtractor={(item, index) => item.id}
        renderItem={({item}) => 
          <FocusItem 
            focus={item} 
            selectFocus={this.props.selectFocus} 
          />
        }
        ItemSeparatorComponent={this._renderSeparator}
      />
    );
  };
};

export default FocusList;