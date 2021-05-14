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