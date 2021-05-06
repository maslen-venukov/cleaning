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
  REMOVE_BACK_CALL = 'REMOVE_BACK_CALL',
  PROCESS_BACK_CALL = 'PROCESS_BACK_CALL',
  SET_BACK_CALLS_ERROR = 'SET_BACK_CALLS_ERROR'
}

export interface IBackCallsState {
  backCalls: IBackCall[]
  error: string
}

export interface IProcessBackCallPayload {
  id: string,
  isProcessed: boolean
}

interface ISetBackCalls extends IAction {
  type: BackCallsActionTypes.SET_BACK_CALLS,
  payload: IBackCall[]
}

interface IRemoveBackCall extends IAction {
  type: BackCallsActionTypes.REMOVE_BACK_CALL,
  payload: string
}

interface IProcessBackCall extends IAction {
  type: BackCallsActionTypes.PROCESS_BACK_CALL,
  payload: IProcessBackCallPayload
}

interface ISetBackCallsError extends IAction {
  type: BackCallsActionTypes.SET_BACK_CALLS_ERROR,
  payload: string
}

export type BackCallsAction = ISetBackCalls | IRemoveBackCall | IProcessBackCall | ISetBackCallsError