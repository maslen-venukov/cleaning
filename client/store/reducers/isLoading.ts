import { LoadingState, LoadingAction, LoadingActionTypes } from '../../types/isLoading'

const initialState: LoadingState = false

const isLoading = (state = initialState, action: LoadingAction): LoadingState => {
  const { type, payload } = action

  switch(type) {
    case LoadingActionTypes.SET_LOADING:
      return payload

    default:
      return state
  }
}

export default isLoading