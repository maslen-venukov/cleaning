import { BackCallsState, BackCallsAction, BackCallsActionTypes } from '../../types/backCalls'

const initialState: BackCallsState = []

const backCall = (state = initialState, action: BackCallsAction): BackCallsState => {
  const { type, payload } = action

  switch(type) {
    case BackCallsActionTypes.SET_BACK_CALLS:
      return payload

    default:
      return state
  }
}

export default backCall