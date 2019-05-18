import { combineReducers } from 'redux'

import statusReducer from './StatusReducer'
import selectionReducer from './SelectionReducer'
import focusesReducer from './FocusesReducer'
import categoriesReducer from './CategoriesReducer'
import settingsReducer from './SettingsReducer'
import statsReducer from './StatsReducer'
import userReducer from './UserReducer'


const RootReducer = combineReducers({
  user: userReducer,
  settings: settingsReducer,
  stats: statsReducer,
  selection: selectionReducer,
  categories: categoriesReducer,
  focuses: focusesReducer,
  status: statusReducer,
})

export default RootReducer