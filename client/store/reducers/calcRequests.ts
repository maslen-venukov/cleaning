import { ICalcRequestsState, CalcRequestsAction, CalcRequestsActionTypes } from '../../types/calcRequests'

const initialState: ICalcRequestsState = {
  calcRequests: [],
  isLoading: false
}

const calcRequests = (state = initialState, action: CalcRequestsAction): ICalcRequestsState => {
  switch(action.type) {
    case CalcRequestsActionTypes.SET_CALC_REQUESTS:
      return {
        ...state,
        calcRequests: action.payload
      }

    case CalcRequestsActionTypes.SET_CALC_REQUESTS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

    case CalcRequestsActionTypes.REMOVE_CALC_REQUEST: {
      const calcRequests = state.calcRequests.filter(calcRequest => calcRequest._id !== action.payload)
      return {
        ...state,
        calcRequests
      }
    }

    case CalcRequestsActionTypes.PROCESS_CALC_REQUEST: {
      const { id, isProcessed } = action.payload
      const calcRequests = state.calcRequests.map(calcRequest => {
        return calcRequest._id === id
          ? { ...calcRequest, isProcessed }
          : calcRequest
      })
      return {
        ...state,
        calcRequests
      }
    }

    default:
      return state
  }
}

export default calcRequests