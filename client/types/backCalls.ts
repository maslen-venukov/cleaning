import { IAction } from '.'

export interface IBackCall {
  _id: string
  phone: string
  name: string
  date: Date
  isProcessed: boolean
}

export enum BackCallsActionTypes {
  SET_BACK_CALLS = 'SET_BACK_CALLS',
  SET_BACK_CALLS_LOADING = 'SET_BACK_CALLS_LOADING',
  REMOVE_BACK_CALL = 'REMOVE_BACK_CALL',
  PROCESS_BACK_CALL = 'PROCESS_BACK_CALL'
}

export interface IBackCallsState {
  backCalls: IBackCall[]
  isLoading: boolean
}

export interface IProcessBackCallPayload {
  id: string,
  isProcessed: boolean
}

interface ISetBackCalls extends IAction {
  type: BackCallsActionTypes.SET_BACK_CALLS,
  payload: IBackCall[]
}

interface ISetBackCallsLoading extends IAction {
  type: BackCallsActionTypes.SET_BACK_CALLS_LOADING,
  payload: boolean
}

interface IRemoveBackCall extends IAction {
  type: BackCallsActionTypes.REMOVE_BACK_CALL,
  payload: string
}

interface IProcessBackCall extends IAction {
  type: BackCallsActionTypes.PROCESS_BACK_CALL,
  payload: IProcessBackCallPayload
}

export type BackCallsAction = ISetBackCalls | ISetBackCallsLoading | IRemoveBackCall | IProcessBackCall