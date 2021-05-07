import { IBackCallsState, BackCallsAction, BackCallsActionTypes } from '../../types/backCalls'

const initialState: IBackCallsState = {
  backCalls: [],
  isLoading: false
}

const backCalls = (state = initialState, action: BackCallsAction): IBackCallsState => {
  switch(action.type) {
    case BackCallsActionTypes.SET_BACK_CALLS:
      return {
        ...state,
        backCalls: action.payload
      }

    case BackCallsActionTypes.SET_BACK_CALLS_LOADING:
      return {
        ...state,
        isLoading: action.payload
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

    default:
      return state
  }
}

export default backCalls