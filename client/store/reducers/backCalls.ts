import { BackCallsState, BackCallsAction, BackCallsActionTypes } from '../../types/backCalls'

const initialState: BackCallsState = []

const backCalls = (state = initialState, action: BackCallsAction): BackCallsState => {
  switch(action.type) {
    case BackCallsActionTypes.SET_BACK_CALLS:
      return action.payload

    case BackCallsActionTypes.REMOVE_BACK_CALL:
      return state.filter(backCall => backCall._id !== action.payload)

    case BackCallsActionTypes.PROCESS_BACK_CALL:
      const { id, isProcessed } = action.payload
      return state.map(backCall => {
        return backCall._id === id
          ? { ...backCall, isProcessed: isProcessed }
          : backCall
      })

    default:
      return state
  }
}

export default backCalls