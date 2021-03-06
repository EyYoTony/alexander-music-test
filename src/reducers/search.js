import { merge } from 'ramda'
import {
  SET_SEARCH_TEXT,
  SET_SEARCH_RESULTS,
  CLEAR_RESULTS
} from '../constants'

export default (state = { text: '', results: [] }, action) => {
  switch (action.type) {
    case SET_SEARCH_TEXT:
      return merge(state, { text: action.payload })
    case SET_SEARCH_RESULTS:
      return merge(state, { results: action.payload })
    case CLEAR_RESULTS:
      return merge(state, { results: [] })
    default:
      return state
  }
}
