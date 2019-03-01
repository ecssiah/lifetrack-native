import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Button, Picker, TouchableOpacity } from 'react-native';
import { auth, db } from '../../config';
import { addCategory } from '../../actions/CategoriesActions';
import { addFocus } from '../../actions/FocusesActions';
import createStyles from '../../styles';

import LTIcon from '../../components/LTIcon';
import LTModal from '../../components/LTModal';

const styles = createStyles({
  addContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: '8%',
  },
  addTextInput: {
    width: 240, 
    height: 40, 
    borderWidth: 1,
    borderColor: 'gray', 
  },
  categoryModalContainer: {
    height: '46%',
    width: '86%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
  },
  categoryText: {
    margin: 10,
    fontSize: 24,
  },
  categoryModalText: {
    fontSize: 24, 
    marginBottom: 4,
  },
  categoryModalInput: {
    width: 272,
    height: 40, 
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'gray', 
  },
  categoryModalPicker: {
    height: '70%',
    width: '80%',
    marginBottom: -32,
  },
});

class FocusAddScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      newCategory: null,
      category: props.categories.types[0],
      categoryModalShow: false,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Add Focus',
    headerLeft: (
      <LTIcon
        type='ios-arrow-back'
        size={32}
        onPress={() => navigation.goBack()}
      />
    ),
  });

  _addFocus = () => {
    const docRef = db.collection('focuses').doc();

    const focus = {
      id: docRef.id,
      userId: auth.currentUser.uid,
      name: this.state.name,
      category: this.state.category,
      level: 0,
      experience: 0.0,
      time: this.props.settings.workPeriod,
      workPeriod: this.props.settings.workPeriod,
      periods: 0,
      workGoal: this.props.settings.workGoal,
      breakPeriod: this.props.settings.breakPeriod,
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

  _onClickCategory = () => {
    this.setState({
      categoryModalShow: true, 
      newCategory: '',
    });
  };

  _onCategoryChange = category => {
    this.setState({
      category,
    });
  };

  _onCategoryConfirm = () => {
    let newState = { categoryModalShow: false };

    if (this.state.newCategory !== '') {
      newState.category = this.state.newCategory;
      this.props.addCategory(this.state.newCategory);
    }

    this.setState(newState);
  };

  _onCategoryCancel = () => {
    this.setState({
      categoryModalShow: false,
    });
  };

  render() {
    return (
      <View style={styles.addContainer}>
        <Text style={styles.section} >Name</Text>

        <TextInput
          style={styles.addTextInput}
          textAlign='center'
          keyboardAppearance='dark'
          maxLength={24}
          returnKeyType='done'
          onChangeText={name => this.setState({name})}
          value={this.state.name}
        />

        <TouchableOpacity
          onPress={this._onClickCategory} 
        >
          <Text style={styles.categoryText}>
            Category: {this.state.category}
          </Text>  
        </TouchableOpacity>

        <LTModal
          style={styles.categoryModalContainer}
          show={this.state.categoryModalShow} 
          onPressBackdrop={this._onCategoryCancel}
        >
          <Text style={styles.categoryModalText}>
            New Category:
          </Text>

          <TextInput
            style={styles.categoryModalInput}
            textAlign='center'
            keyboardAppearance='dark'
            maxLength={24}
            returnKeyType='done'
            onChangeText={newCategory => this.setState({newCategory})}
            value={this.state.newCategory}
          />

          <Picker
            style={styles.categoryModalPicker}
            selectedValue={this.state.category}
            onValueChange={value => this._onCategoryChange(value)}
          >
            {
              this.props.categories.types.map((category, idx) => 
                <Picker.Item 
                  key={idx} 
                  label={category} 
                  value={category}
                />
              )
            }
          </Picker>

          <Button
            title='Done'
            onPress={this._onCategoryConfirm}
          />
        </LTModal>

        <Button
          onPress={this._addFocus}
          title="Add Focus"
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  settings: state.settings,
});

const mapDispatchToProps = dispatch => ({
  addCategory: category => dispatch(addCategory(category)),
  addFocus: focus => dispatch(addFocus(focus)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusAddScreen);