import { LoadingState, LoadingAction, LoadingActionTypes } from '../../types/isLoading'

export const setLoading = (payload: LoadingState): LoadingAction => ({
  type: LoadingActionTypes.SET_LOADING,
  payload
})