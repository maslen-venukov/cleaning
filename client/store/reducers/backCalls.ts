import { BackCallsState, BackCallsAction, BackCallsActionTypes } from '../../types/backCalls'

const initialState: BackCallsState = []

const backCall = (state = initialState, action: BackCallsAction): BackCallsState => {
  switch(action.type) {
    case BackCallsActionTypes.SET_BACK_CALLS:
      return action.payload

    case BackCallsActionTypes.REMOVE_BACK_CALL:
      return state.filter(backCall => backCall._id !== action.payload)

    case BackCallsActionTypes.PROCESS_BACK_CALL:
      return state.map(backCall => {
        return backCall._id === action.payload.id
          ? { ...backCall, isProcessed: action.payload.isProcessed }
          : backCall
      })

    default:
      return state
  }
}

export default backCall