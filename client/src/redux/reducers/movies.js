import update from 'immutability-helper'
import { REQUEST_MOVIES, RECEIVE_MOVIES } from '../actions/actionTypes'

const defaultState = {
  movies:[]
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case REQUEST_MOVIES:
      return update(state, {
        isFetching: {$set:true},
        didInvalidate: {$set:false}
      })
    case RECEIVE_MOVIES:  
      return update(state, {
        movies: {$set:action.movies},
        isFetching: {$set:false},
        didInvalidate: {$set:false},
        lastUpdated: {$set:action.receivedAt}
      })
    default:
      return state
  }
}