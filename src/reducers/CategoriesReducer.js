import { 
  SET_CATEGORIES,
  UPDATE_CATEGORIES, 
  ADD_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY, 
  UPDATE_CATEGORY_NAME,
} from "../constants/Categories"

function categoriesReducer(state = {}, action) {
  const newState = { ...state }

  switch (action.type) {
    case SET_CATEGORIES: {
      return action.categories
    }
    case UPDATE_CATEGORIES: {
      Object.assign(newState, action.update)

      return newState
    }
    case ADD_CATEGORY: {
      newState[action.name] = action.update

      return newState
    }
    case UPDATE_CATEGORY: {
      Object.assign(newState[action.name], action.update)

      return newState
    }
    case DELETE_CATEGORY: {
      delete newState[action.name]
        
      return newState
    }
    case UPDATE_CATEGORY_NAME: {
      newState[action.newName] = newState[action.name]
      delete newState[action.name]

      return newState
    }
    default: {
      return newState
    }
  }
}

export default categoriesReducer