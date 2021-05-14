import { IAction } from '.'
import { IAdditionalServiceOption } from './services'

interface ICalcRequestAdditional {
  name: string
  options: IAdditionalServiceOption & { value: number }
}

export interface ICalcRequest {
  _id?: string
  name: string
  email: string
  date?: Date
  isProcessed?: boolean
  services: {
    main: {
      name: string
      price: number
      units: string
      value: number
    },
    additionals?: ICalcRequestAdditional[]
  }
}

export enum CalcRequestsActionTypes {
  SET_CALC_REQUESTS = 'SET_CALC_REQUESTS',
  SET_CALC_REQUESTS_LOADING = 'SET_CALC_REQUESTS_LOADING',
  REMOVE_CALC_REQUEST = 'REMOVE_CALC_REQUEST',
  PROCESS_CALC_REQUEST = 'PROCESS_CALC_REQUEST'
}

export interface ICalcRequestsState {
  calcRequests: ICalcRequest[]
  isLoading: boolean
}

export interface IProcessCalcRequestPayload {
  id: string,
  isProcessed: boolean
}

interface ISetCalcRequests extends IAction {
  type: CalcRequestsActionTypes.SET_CALC_REQUESTS,
  payload: ICalcRequest[]
}

interface ISetCalcRequestsLoading extends IAction {
  type: CalcRequestsActionTypes.SET_CALC_REQUESTS_LOADING,
  payload: boolean
}

interface IRemoveCalcRequest extends IAction {
  type: CalcRequestsActionTypes.REMOVE_CALC_REQUEST,
  payload: string
}

interface IProcessCalcRequest extends IAction {
  type: CalcRequestsActionTypes.PROCESS_CALC_REQUEST,
  payload: IProcessCalcRequestPayload
}

export type CalcRequestsAction = ISetCalcRequests | ISetCalcRequestsLoading | IRemoveCalcRequest | IProcessCalcRequest