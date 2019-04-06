import React from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { auth } from '../../../config/firebaseConfig'
import { UNCATEGORIZED } from '../../../constants/Categories'
import { UPDATE_SELECTION } from '../../../constants/Selection'
import { addFocus } from '../../../handlers/FocusesHandlers'
import { updateCategory } from '../../../handlers/CategoryHandlers'
import createStyles from '../../../styles'

import LTIcon from '../../../components/LT/LTIcon'
import FocusList from '../../../components/focuses/FocusList'
import FocusAddModal from '../../../components/modals/FocusAddModal'

const styles = createStyles({
  container: {
    flex: 1,
  },
})

class FocusesScreen extends React.Component 
{
  constructor(props) {
    super(props)

    this.state = {
      focusName: '',
      categoryName: UNCATEGORIZED,
      addModalShow: false,
    }
  }


  static navigationOptions = ({ navigation }) => ({
    title: 'Focuses',
    headerLeft: (
      <LTIcon
        type='md-help'
        size={26}
        onPress={() => navigation.getParam('helpSelect')()}
      />
    ),
    headerRight: (
      <LTIcon
        type='ios-add'
        size={42}
        onPress={() => navigation.getParam('addFocusSelect')()}
      />
    ),
  })


  componentDidMount() {
    this.props.navigation.setParams({
      helpSelect: this._helpSelect,
      addFocusSelect: this._onAddFocusSelect,
    })
  }

  
  _helpSelect = () => {
    this.props.navigation.navigate('Help')
  }


  _onAddFocusSelect = () => {
    this.setState({
      addModalShow: true,
    })
  }


  _onAddFocusConfirm = () => {
    const focus = {
      name: this.state.focusName,
      category: this.state.categoryName,
      userId: auth.currentUser.uid,
      active: false,
      working: true,
      visible: true,
      periods: 0,
      level: 0,
      experience: 0.0,
      timer: null,
      time: this.props.settings.workPeriod * 60,
      workPeriod: this.props.settings.workPeriod,
      workGoal: this.props.settings.workGoal,
      breakPeriod: this.props.settings.breakPeriod,
      history: {},
    }

    this.props.addFocus(focus)

    this.setState({
      addModalShow: false,
      focusName: '',
      categoryName: this.state.categoryName,
    })
  }


  _onAddFocusCancel = () => {
    this.setState({
      addModalShow: false,
      focusName: '',
      categoryName: UNCATEGORIZED,
    })
  }


  _onFocusSelect = id => {
    this.props.updateSelection({ id })
    this.props.navigation.navigate('Focus')
  }


  _onCategoryValueChange = categoryName => {
    this.setState({
      categoryName,
    })
  }


  _onCategorySelect = categoryName => {
    const update = {
      show: !this.props.categories[categoryName].show,
    }

    this.props.updateCategory(categoryName, update)
  }


  render() {
    return (
      <View style={styles.container}>
        <FocusList
          focuses={this.props.focuses}
          categories={this.props.categories}
          onFocusSelect={this._onFocusSelect}
          onCategorySelect={this._onCategorySelect}
        />

        <FocusAddModal
          categories={this.props.categories}
          show={this.state.addModalShow}
          categoryName={this.state.categoryName}
          focusName={this.state.focusName}
          onConfirm={this._onAddFocusConfirm}
          onCancel={this._onAddFocusCancel}
          onFocusNameChange={text => this.setState({ focusName: text })}
          onCategoryValueChange={value => this._onCategoryValueChange(value)}
        />
      </View>
    )
  }
}

const mapStateToProps = state => ({
  categories: state.categories,
  settings: state.settings,
  selection: state.selection,
  focuses: state.focuses,
})

const mapDispatchToProps = dispatch => ({
  addFocus: focus => addFocus(dispatch, focus), 
  updateSelection: update => dispatch({ type: UPDATE_SELECTION, update }),
  updateCategory: (name, update) => updateCategory(dispatch, name, update),
})

export default connect(mapStateToProps, mapDispatchToProps)(FocusesScreen)