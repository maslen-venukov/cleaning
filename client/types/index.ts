import { IMainService } from './services'

export interface IAction {
  type: string
  payload?: any
}

export interface IService {
  _id?: string
  name: string
  price: number
  units: string
  value: number
}

export interface IMainServiceRecord extends IMainService {
  value: number
}