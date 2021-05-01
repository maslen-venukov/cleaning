import { LoadingState, LoadingAction, LoadingActionTypes } from "../../types/loading"

const initialState: LoadingState = false

const loading = (state = initialState, action: LoadingAction): LoadingState => {
  const { type, payload } = action

  switch(type) {
    case LoadingActionTypes.SET_LOADING:
      return payload

    default:
      return state
  }
}

export default loading