import update from 'immutability-helper'
const defaultState = {
  comments:[]
}
export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_COMMENT':
      return update(state, {
        comments: {$push:[action.text]}
      })
    default:
      return state
  }
}