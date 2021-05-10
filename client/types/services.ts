import { IAction } from '.'

export interface IMainService {
  _id?: string
  name: string
  price: number | ''
  units: string
  includes: string[]
  info: string
}

export interface IAdditionalServiceOption {
  _id?: string
  name: string
  price: number
  units: string
}

export interface IAdditionalService {
  _id?: string
  name: string
  options: IAdditionalServiceOption[]
}

export type Service = IMainService | IAdditionalService

export enum ServicesActionTypes {
  SET_MAIN_SERVICES = 'SET_MAIN_SERVICES',
  SET_ADDITIONAL_SERVICES = 'SET_ADDITIONAL_SERVICES',
  SET_SERVICES_LOADING = 'SET_SERVICES_LOADING',
  CREATE_MAIN_SERVICE = 'CREATE_MAIN_SERVICE',
  CREATE_ADDITIONAL_SERVICE = 'CREATE_ADDITIONAL_SERVICE',
  REMOVE_MAIN_SERVICE = 'REMOVE_MAIN_SERVICE',
  REMOVE_ADDITIONAL_SERVICE = 'REMOVE_ADDITIONAL_SERVICE',
  UPDATE_MAIN_SERVICE = 'UPDATE_MAIN_SERVICE',
  UPDATE_ADDITIONAL_SERVICE = 'UPDATE_ADDITIONAL_SERVICE'
}

export interface IServicesState {
  main: IMainService[]
  additional: IAdditionalService[]
  isLoading: boolean
}

export interface IUpdateServicePayload {
  id: string
  data: {
    id?: string
    name: string
    price?: number
    units?: string
    info?: string
    includes?: string[]
    options?: IAdditionalServiceOption[]
  }
}

interface ISetMainServices extends IAction {
  type: ServicesActionTypes.SET_MAIN_SERVICES,
  payload: IMainService[]
}

interface ISetAdditionalServices extends IAction {
  type: ServicesActionTypes.SET_ADDITIONAL_SERVICES,
  payload: IAdditionalService[]
}

interface ISetServicesLoading extends IAction {
  type: ServicesActionTypes.SET_SERVICES_LOADING,
  payload: boolean
}

interface ICreateMainService extends IAction {
  type: ServicesActionTypes.CREATE_MAIN_SERVICE,
  payload: IMainService
}

interface ICreateAdditionalService extends IAction {
  type: ServicesActionTypes.CREATE_ADDITIONAL_SERVICE,
  payload: IAdditionalService
}

interface IRemoveMainService extends IAction {
  type: ServicesActionTypes.REMOVE_MAIN_SERVICE,
  payload: string
}

interface IRemoveAdditionalService extends IAction {
  type: ServicesActionTypes.REMOVE_ADDITIONAL_SERVICE,
  payload: string
}

interface IUpdateMainService extends IAction {
  type: ServicesActionTypes.UPDATE_MAIN_SERVICE,
  payload: IUpdateServicePayload
}

interface IUpdateAdditionalService extends IAction {
  type: ServicesActionTypes.UPDATE_ADDITIONAL_SERVICE,
  payload: IUpdateServicePayload
}

export type ServicesAction =
  ISetMainServices
  | ISetAdditionalServices
  | ISetServicesLoading
  | ICreateMainService
  | ICreateAdditionalService
  | IRemoveMainService
  | IRemoveAdditionalService
  | IUpdateMainService
  | IUpdateAdditionalService