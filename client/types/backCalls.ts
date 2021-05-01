import { IAction } from '.'

export interface IBackCall {
  _id: string
  phone: string
  name: string
  date: Date
  isProcessed: boolean
}

export enum BackCallsActionTypes {
  SET_BACK_CALLS = 'SET_BACK_CALLS'
}

export type BackCallsState = IBackCall[]

interface ISetBackCalls extends IAction {
  type: BackCallsActionTypes.SET_BACK_CALLS,
  payload: IBackCall[]
}

export type BackCallsAction = ISetBackCalls