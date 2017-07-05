import { merge } from 'ramda'
import { SET_SEARCH_TEXT } from '../constants'

export default (state = { searchText: '', results: [] }, action) => {
  switch (action.type) {
    case SET_SEARCH_TEXT:
      return merge(state, { searchText: action.payload })
    default:
      return state
  }
}
