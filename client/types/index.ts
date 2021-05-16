import { IMainService } from './services'

export const API_URL = 'http://localhost:5000'

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

export interface IFormValues {
  name: string
  phone: string
  address: string
  date: {
    _d: Date
  }
  comment?: string
  main: string
  value: number
  additionals: { name: string[], value: number }[]
}