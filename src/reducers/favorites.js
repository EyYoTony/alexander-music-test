import { append } from 'ramda'
import { SET_FAVORITES, ADD_FAVORITE_TO_FAVORITES } from '../constants'

export default (state = [], action) => {
  switch (action.type) {
    case SET_FAVORITES:
      return action.payload
    case ADD_FAVORITE_TO_FAVORITES:
      return append(action.payload, state)
    default:
      return state
  }
}
