import React from 'react';
import { connect } from 'react-redux';
import { Alert, View } from 'react-native';
import { 
  WORK_PERIOD, WORK_GOAL, BREAK_PERIOD,
} from '../../../constants/Focus';
import { 
  updateFocus, 
  deleteFocus 
} from '../../../handlers/FocusesHandlers';
import createStyles from '../../../styles';

import LTIcon from '../../../components/LT/LTIcon';
import CategoryModal from '../../../components/modals/CategoryModal';
import SettingsModal from '../../../components/modals/SettingsModal';
import DeleteFocusModal from '../../../components/modals/DeleteFocusModal';
import FocusEditList from '../../../components/focuses/FocusEditList';

const styles = createStyles({
  container: {
    flex: 1,
  },
});

class FocusEditScreen extends React.Component 
{
  constructor(props) {
    super(props);

    this.state = {
      nameInputStyle: styles.nameInputBlur,
      name: props.focuses[props.focus.id].name,
      categoryName: props.focuses[props.focus.id].category,
      settingName: '',
      settingValue: 1,
      categoryModalShow: false,
      settingsModalShow: false,
      deleteModalShow: false,
    };
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Edit Focus',
    headerLeft: (
      <LTIcon
        type='ios-arrow-back'
        size={32}
        onPress={() => navigation.goBack()}
      />
    ),
  });

  _onEditNameChange = name => {
    this.setState({
      name,
    });
  };

  _onEditNameConfirm = () => {
    this.props.updateFocus(this.props.focus.id, { name: this.state.name });
  };

  _onEditNameFocus = () => {
    this.setState({
      nameInputStyle: styles.nameInputFocus,
    });
  };

  _onEditNameBlur = () => {
    this.setState({
      nameInputStyle: styles.nameInputBlur,
    });
  };

  _onSettingSelect = settingName => {
    let settingValue;
    const focus = this.props.focuses[this.props.focus.id];

    switch (settingName) {
      case WORK_PERIOD: {
        settingValue = focus.workPeriod.toString();
        break;
      }
      case WORK_GOAL: {
        settingValue = focus.workGoal.toString();
        break;
      }
      case BREAK_PERIOD: {
        settingValue = focus.breakPeriod.toString();
        break;
      }
      default: {
        console.error('Invalid setting: ' + settingName);
      }
    }

    this.setState({
      settingName,
      settingValue,
      settingsModalShow: true,
    });
  };

  _onSettingValueChange = settingValue => {
    this.setState({
      settingValue,
    });
  };

  _onSettingConfirm = () => {
    let update = {};

    switch (this.state.settingName) {
      case WORK_PERIOD: {
        update.workPeriod = parseInt(this.state.settingValue);

        if (this.props.focuses[this.props.focus.id].working) {
          update.time = 60 * update.workPeriod;
        }

        break;
      }
      case WORK_GOAL: {
        update.workGoal = parseInt(this.state.settingValue);
        break;
      }
      case BREAK_PERIOD: {
        update.breakPeriod = parseInt(this.state.settingValue);
        break;
      }
      default: {
        console.error('Invalid setting: ' + this.state.settingValue);
      }
    }

    this.props.updateFocus(this.props.focus.id, update);

    this.setState({
      settingsModalShow: false,
    });
  };

  _onSettingCancel = () => {
    this.setState({
      settingsModalShow: false,
    });
  };

  _onCategorySelect = () => {
    this.setState({
      categoryModalShow: true, 
    });
  };

  _onCategoryValueChange = categoryName => {
    this.setState({
      categoryName,
    });
  };

  _onCategoryConfirm = () => {
    this.props.updateFocus(
      this.props.focus.id, 
      { category: this.state.categoryName }
    );

    this.setState({
      categoryName: this.state.categoryName,
      categoryModalShow: false,
    });
  };

  _onCategoryCancel = () => {
    this.setState({
      categoryName: this.props.focuses[this.props.focus.id].category,
      categoryModalShow: false,
    });
  };

  _onDeleteSelect = () => {
    const focusName = this.props.focuses[this.props.focus.id].name;

    Alert.alert(
      'Are you sure you want to delete ' + focusName + '?',
      '',
      [
        { text: 'Cancel', onPress: null },
        { text: 'Confirm', onPress: this._onDeleteConfirm },
      ],
    );
  };

  _onDeleteConfirm = async () => {
    clearInterval(this.props.focuses[this.props.focus.id].timer);

    await this.props.deleteFocus(this.props.focus.id);

    this.props.navigation.navigate('Focuses');
  };

  _onDeleteCancel = () => {
    this.setState({
      deleteModalShow: false,
    });
  };

  render() {
    const focus = this.props.focuses[this.props.focus.id];

    if (!focus) return null;

    return (
      <View style={styles.container}>
        <FocusEditList
          name={this.state.name}
          focus={this.props.focuses[this.props.focus.id]}
          onEditNameChange={this._onEditNameChange}
          onEditNameConfirm={this._onEditNameConfirm}
          onSettingSelect={this._onSettingSelect} 
          onCategorySelect={this._onCategorySelect}
          onDeleteSelect={this._onDeleteSelect}
        />

        <CategoryModal
          categories={this.props.categories}
          show={this.state.categoryModalShow}
          categoryName={this.state.categoryName}
          onConfirm={this._onCategoryConfirm}
          onCancel={this._onCategoryCancel}
          onCategoryValueChange={value => this._onCategoryValueChange(value)} 
        />

        <SettingsModal
          show={this.state.settingsModalShow}
          settingName={this.state.settingName}
          settingValue={this.state.settingValue}
          onConfirm={this._onSettingConfirm}
          onCancel={this._onSettingCancel}
          onSettingValueChange={value => this._onSettingValueChange(value)}
        />

        <DeleteFocusModal
          show={this.state.deleteModalShow}
          onConfirm={this._onDeleteConfirm}
          onCancel={this._onDeleteCancel}
        />
      </View>
    );
  };
};

const mapStateToProps = state => ({
  focus: state.focus,
  focuses: state.focuses,
  categories: state.categories,
});

const mapDispatchToProps = dispatch => ({
  updateFocus: (id, update) => updateFocus(dispatch, id, update),
  deleteFocus: id => deleteFocus(dispatch, id),
});

export default connect(mapStateToProps, mapDispatchToProps)(FocusEditScreen);