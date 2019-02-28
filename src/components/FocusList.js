import React from 'react';
import { FlatList, View } from 'react-native';
import createStyles from '../styles';

import FocusItem from './FocusItem';

const styles = createStyles({
  separator: {
    height: 1,
    backgroundColor: '#ced0ce',
    marginHorizontal: '3%',
  },
});

class FocusList extends React.Component {
  _renderSeparator = () => {
    return (
      <View style={styles.separator} />
    );
  };

  render() {
    return (
      <FlatList
        data={Object.values(this.props.focuses)}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={this._renderSeparator}
        renderItem={({item}) => 
          <FocusItem 
            focus={item} 
            selectFocus={this.props.selectFocus} 
          />
        }
      />
    );
  };
};

export default FocusList;