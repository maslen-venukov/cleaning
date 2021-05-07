import { IAction } from '.'

interface IOrderService {
  name: string
  price: number
  units: string
  value: number
}

export interface IOrder {
  _id?: string
  name: string
  connection: string
  date: Date
  services: {
    main: IOrderService
    additionals: IOrderService[]
  }
}

export enum OrdersActionTypes {
  SET_ORDERS = 'SET_ORDERS',
  SET_ORDERS_LOADING = 'SET_ORDERS_LOADING',
  UPDATE_ORDER = 'UPDATE_ORDER',
  REMOVE_ORDER = 'REMOVE_ORDER'
}

export interface IOrdersState {
  orders: IOrder[]
  isLoading: boolean
}

export interface IUpdateOrderPayload {
  id: string,
  data: IOrder
}

interface ISetOrders extends IAction {
  type: OrdersActionTypes.SET_ORDERS,
  payload: IOrder[]
}

interface ISetOrdersLoading extends IAction {
  type: OrdersActionTypes.SET_ORDERS_LOADING,
  payload: boolean
}

interface IUpdateOrder extends IAction {
  type: OrdersActionTypes.UPDATE_ORDER,
  payload: IUpdateOrderPayload
}

interface IRemoveOrder extends IAction {
  type: OrdersActionTypes.REMOVE_ORDER,
  payload: string
}

export type OrdersAction = ISetOrders | ISetOrdersLoading | IUpdateOrder | IRemoveOrder