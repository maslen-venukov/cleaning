import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'

import user from './user'
import isLoading from './isLoading'
import backCalls from './backCalls'
import reviews from './reviews'
import services from './services'

const rootReducer = combineReducers({
  user,
  isLoading,
  backCalls,
  reviews,
  services
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