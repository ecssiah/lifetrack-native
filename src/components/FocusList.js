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