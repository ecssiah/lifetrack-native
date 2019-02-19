import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './style';
import { auth, db } from '../../config';

class FocusAddScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      category: '',
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Add Focus',
  });

  componentDidMount() {
    this.props.navigation.setParams({
      addFocus: this.addFocus,
    });
  };

  addFocus = () => {
    db.collection('focuses').add({
      userId: auth.currentUser.uid,
      name: this.state.name,
      category: this.state.category,
      level: 0,
      experience: 0.0,
    }).then(() => {
      this.props.navigation.navigate('Focuses');
    }).catch(err => {
      console.error(err);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.section} >
          Name
        </Text>

        <TextInput
          style={{height: 40, width: 240, borderColor: 'gray', borderWidth: 1}}
          onChangeText={name => this.setState({name})}
          value={this.state.name}
        />

        <Text style={styles.section} >
          Category
        </Text>

        <TextInput
          style={{height: 40, width: 240, borderColor: 'gray', borderWidth: 1}}
          onChangeText={category => this.setState({category})}
          value={this.state.category}
        />

        <Button
          onPress={this.addFocus}
          title="Add Focus"
          color="#841584"
        />
      </View>
    );
  }
}

export default FocusAddScreen;