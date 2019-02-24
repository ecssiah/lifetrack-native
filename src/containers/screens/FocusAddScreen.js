import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button } from 'react-native';
import { auth, db } from '../../config';
import { addFocus } from '../../actions/FocusesActions';
import createStyles from '../../styles';

const styles = createStyles({
  focusAddContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: '10%',
  },
  focusInput: {
    width: 240, 
    height: 40, 
    borderWidth: 1,
    borderColor: 'gray', 
  },
});

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
    const docRef = db.collection('focuses').doc();

    const focus = {
      id: docRef.id,
      userId: auth.currentUser.uid,
      name: this.state.name,
      category: this.state.category,
      time: this.props.settings.workPeriod,
      periods: 0,
      level: 0,
      experience: 0.0,
      working: true,
      timerActive: false,
      timer: null,
    };

    docRef.set(focus).then(doc => {
      this.props.addFocus(focus);
      this.props.navigation.navigate('Focuses');
    }).catch(err => {
      console.error(err);
    });
  };

  render() {
    return (
      <View style={styles.focusAddContainer}>
        <Text style={styles.section} >Name</Text>

        <TextInput
          style={styles.focusInput}
          textAlign='center'
          keyboardAppearance='dark'
          onChangeText={name => this.setState({name})}
          value={this.state.name}
        />

        <Text style={styles.section} >Category</Text>

        <TextInput
          style={styles.focusInput}
          textAlign='center'
          keyboardAppearance='dark'
          onChangeText={category => this.setState({category})}
          value={this.state.category}
        />

        <Button
          onPress={this._addFocus}
          title="Add Focus"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  addFocus: focus => dispatch(addFocus(focus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusAddScreen);