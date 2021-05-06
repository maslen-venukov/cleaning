import { IAction } from '.'

export enum LoadingActionTypes {
  SET_LOADING = 'SET_LOADING'
}

export type LoadingState = boolean

interface ISetLoading extends IAction {
  type: LoadingActionTypes.SET_LOADING,
  payload: boolean
}

export type LoadingAction = ISetLoading