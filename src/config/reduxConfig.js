import { createStore } from 'redux'
import RootReducer from '../reducers/RootReducer'

const initialState = {
  status: {
    appState: 'active',
  },
}

const reduxStore = createStore(
  RootReducer, 
  initialState,
)

export default reduxStore
