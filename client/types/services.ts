import { IAction } from '.'

export interface IMainService {
  _id: string
  name: string
  price: number
  units: string
  includes: string[]
  info: string
}

interface IAdditionalServiceOption {
  _id: string
  name: string
  price: number
  units: string
}

export interface IAdditionalService {
  _id?: string
  name: string
  options: IAdditionalServiceOption[]
}

export enum ServicesActionTypes {
  SET_MAIN_SERVICES = 'SET_MAIN_SERVICES',
  SET_ADDITIONAL_SERVICES = 'SET_ADDITIONAL_SERVICES',
  SET_SERVICES_LOADING = 'SET_SERVICES_LOADING'
}

export interface IServicesState {
  main: IMainService[]
  additional: IAdditionalService[]
  isLoading: boolean
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

export type ServicesAction = ISetMainServices | ISetAdditionalServices | ISetServicesLoading