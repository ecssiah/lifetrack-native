import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button } from 'react-native';
import { auth, db } from '../../config';
import createStyles from '../../styles';

const styles = createStyles({
  focusEditContainer: {
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

class FocusEditScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Focus',
  });

  componentWillUnmount() {
    console.warn("Unmounting Focus Edit");
  }

  _updateFocus = () => {
    const docRef = db.collection('focuses').doc(this.props.focus.id);

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

    db.collection('focuses').doc(this.props.focus.id).set(focus).then(doc => {
      this.props.addFocus(focus);
      this.props.navigation.navigate('Focus');
    }).catch(err => {
      console.error(err);
    });
  };

  render() {
    return (
      <View style={styles.focusEditContainer}>
        <Text style={styles.section} >Name</Text>

        <TextInput
          style={styles.focusInput}
          textAlign='center'
          keyboardAppearance='dark'
          onChangeText={() => console.warn("name")}
          value=''
        />

        <Text style={styles.section} >Category</Text>

        <TextInput
          style={styles.focusInput}
          textAlign='center'
          keyboardAppearance='dark'
          onChangeText={() => console.warn("category")}
          value=''
        />

        <Button
          onPress={this._editFocus}
          title="Edit Focus"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  focus: state.focus,
  focuses: state.focuses,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusEditScreen);