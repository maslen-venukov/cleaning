import { IService, IAction } from '.'

export interface IOrder {
  _id?: string
  name: string
  connection: string
  address: string
  date: Date
  isCompleted?: boolean
  comment?: string
  services: {
    main: IService
    additionals: IService[]
  }
}

export enum OrdersActionTypes {
  SET_ORDERS = 'SET_ORDERS',
  SET_ORDERS_LOADING = 'SET_ORDERS_LOADING',
  CREATE_ORDER = 'CREATE_ORDER',
  UPDATE_ORDER = 'UPDATE_ORDER',
  REMOVE_ORDER = 'REMOVE_ORDER'
}

export interface IOrdersState {
  orders: IOrder[]
  isLoading: boolean
}

export interface IUpdateOrderPayload {
  id: string,
  data: any
}

interface ISetOrders extends IAction {
  type: OrdersActionTypes.SET_ORDERS,
  payload: IOrder[]
}

interface ICreateOrder extends IAction {
  type: OrdersActionTypes.CREATE_ORDER,
  payload: IOrder
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

export type OrdersAction = ISetOrders | ISetOrdersLoading | ICreateOrder | IUpdateOrder | IRemoveOrder