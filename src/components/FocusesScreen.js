import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { Button, Text, View, FlatList, SectionList } from 'react-native';
import { auth, db } from '../config';
import createStyles from '../styles';

import FocusItem from './FocusItem';

const styles = createStyles();

class FocusesScreen extends React.Component {
  constructor(props) {
    super(props);

    props.navigation.addListener('willFocus', this._loadFocuses);

    this.state = {
      focuses: [],
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Focuses',
    headerRight: (
      <Icon
        name='ios-add' size={35} color='#ffffff' 
        onPress={ () => navigation.navigate('FocusAdd') }
        style={{ 
          paddingRight: 18, 
        }}
      />
    ),
  });

  _loadFocuses = () => {
    let focuses = [];

    db.collection('focuses').where(
      'userId', '==', auth.currentUser.uid
    ).get(
    ).then(snapshot => {
      snapshot.forEach(doc => {
        focuses.push({
          id: doc.id,
          userId: doc.get('userId'),
          name: doc.get('name'),
          category: doc.get('category'),
          level: doc.get('level'),
          experience: doc.get('experience'),
        });

        this.setState({
          focuses,
        });
      });
    }).catch(err => {
      console.error(err);
    });
  };

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
      <View style={styles.screen}>
        <FlatList
          data={this.state.focuses}
          keyExtractor={(item, index) => item.id}
          renderItem={({item}) => <FocusItem focus={item} />}
          ItemSeparatorComponent={this._renderSeparator}
        />
      </View>
    );
  }
}

export default FocusesScreen;