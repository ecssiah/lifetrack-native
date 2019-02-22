import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button } from 'react-native';
import { auth, db } from '../../config';
import { addFocus } from '../../actions/FocusesActions';
import createStyles from '../../styles';

const styles = createStyles();

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

  _addFocus = () => {
    const focus = {
      id: null,
      userId: auth.currentUser.uid,
      name: this.state.name,
      category: this.state.category,
      time: this.props.settings.workPeriod,
      periods: 0,
      level: 0,
      experience: 0.0,
    };

    db.collection('focuses').add(
      focus
    ).then(doc => {
      this.props.addFocus(doc.id, { id: doc.id, ...focus });
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
          onPress={this._addFocus}
          title="Add Focus"
          color="#841584"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  addFocus: (id, focus) => dispatch(addFocus(id, focus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusAddScreen);