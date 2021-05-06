import { IBackCallsState, BackCallsAction, BackCallsActionTypes } from '../../types/backCalls'

const initialState: IBackCallsState = {
  backCalls: [],
  error: ''
}

const backCalls = (state = initialState, action: BackCallsAction): IBackCallsState => {
  switch(action.type) {
    case BackCallsActionTypes.SET_BACK_CALLS:
      return {
        ...state,
        backCalls: action.payload
      }

    case BackCallsActionTypes.REMOVE_BACK_CALL: {
      const backCalls = state.backCalls.filter(backCall => backCall._id !== action.payload)
      return {
        ...state,
        backCalls
      }
    }

    case BackCallsActionTypes.PROCESS_BACK_CALL: {
      const { id, isProcessed } = action.payload
      const backCalls = state.backCalls.map(backCall => {
        return backCall._id === id
          ? { ...backCall, isProcessed: isProcessed }
          : backCall
      })
      return {
        ...state,
        backCalls
      }
    }

    case BackCallsActionTypes.SET_BACK_CALLS_ERROR:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default backCalls