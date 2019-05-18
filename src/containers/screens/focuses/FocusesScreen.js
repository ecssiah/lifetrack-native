import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import { isEmpty } from 'lodash-es'
import { connect } from 'react-redux'
import { auth } from '../../../config/firebaseConfig'
import { loadUserLocal } from '../../../handlers/AuthHandlers'
import { updateUser } from '../../../handlers/UserHandlers';
import { UNCATEGORIZED } from '../../../constants/Categories'
import { UPDATE_SELECTION } from '../../../constants/Selection'
import { 
  addFocus, addFocusDB, addFocusLocal 
} from '../../../handlers/FocusesHandlers'
import { 
  updateCategory, updateCategoryLocal 
} from '../../../handlers/CategoryHandlers'
import createStyles, { Color } from '../../../styles'

import LTIcon from '../../../components/LT/LTIcon'
import FocusList from '../../../components/focuses/FocusList'
import FocusAddModal from '../../../components/modals/FocusAddModal'


const styles = createStyles({
  container: {
    flex: 1,
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})


class FocusesScreen extends React.Component 
{
  static navigationOptions = ({ navigation }) => ({
    title: 'Focuses',
    headerLeft: (
      <LTIcon
        type='md-help'
        size={26}
        onPress={() => navigation.getParam('focusesHelpSelect')()}
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


  constructor(props) {
    super(props)

    this.state = {
      focusName: '',
      categoryName: UNCATEGORIZED,
      addModalShow: false,
    }
  }


  componentDidMount() {
    this.props.navigation.setParams({
      focusesHelpSelect: this._focusesHelpSelect,
      addFocusSelect: this._onAddFocusSelect,
    })
  }

  
  _focusesHelpSelect = () => {
    this.props.navigation.navigate('FocusHelp')
  }


  _onAddFocusSelect = () => {
    this.setState({
      addModalShow: true,
    })
  }


  _onAddFocusConfirm = async () => {
    const focus = {
      name: this.state.focusName,
      category: this.state.categoryName,
      userId: auth.currentUser.uid,
      active: false,
      working: true,
      statVisible: true,
      chartColor: this.props.user.nextChartColor,
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

    this.props.updateUser({ 
      nextChartColor: this.props.user.nextChartColor + 1 
    })

    const id = await this.props.addFocusLocal(focus)
    this.props.addFocus(id, focus)

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
      focusVisible: !this.props.categories[categoryName].focusVisible,
    }

    this.props.updateCategory(categoryName, update)
    this.props.updateCategoryLocal(categoryName, update)
  }


  render() {
    if (isEmpty(this.props.categories)) {
      return (
        <View style={styles.indicatorContainer}>
          <ActivityIndicator
            size="large"
            color={Color.primary}
          />
        </View>
      )
    } else {
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
}


const mapStateToProps = state => ({
  categories: state.categories,
  settings: state.settings,
  selection: state.selection,
  focuses: state.focuses,
  user: state.user,
})


const mapDispatchToProps = dispatch => ({
  addFocus: (id, focus) => addFocus(dispatch, id, focus), 
  addFocusDB: focus => addFocusDB(focus), 
  addFocusLocal: focus => addFocusLocal(focus),
  updateSelection: update => dispatch({ type: UPDATE_SELECTION, update }),
  updateCategory: (name, update) => updateCategory(dispatch, name, update),
  updateCategoryLocal: (name, update) => updateCategoryLocal(name, update),
  updateUser: update => updateUser(dispatch, update),
  loadUserLocal: () => loadUserLocal(dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(FocusesScreen)