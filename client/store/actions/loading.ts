import { LoadingState, LoadingAction, LoadingActionTypes } from '../../types/loading'

export const setLoading = (payload: LoadingState): LoadingAction => ({
  type: LoadingActionTypes.SET_LOADING,
  payload
})