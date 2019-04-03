import { createStore } from 'redux'
import RootReducer from '../reducers/RootReducer'

const initialState = {
  status: {
    appState: 'active',
    tracked: 0,
  },
}

const reduxStore = createStore(
  RootReducer, 
  initialState,
)

export default reduxStore
