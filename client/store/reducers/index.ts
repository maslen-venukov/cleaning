import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'

import backCalls from './backCalls'
import loading from './loading'

const rootReducer = combineReducers({
  backCalls,
  loading
})

export const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload
    }
    if (state.count) nextState.count = state.count
    return nextState
  } else {
    return rootReducer(state, action)
  }
}

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer