import { Dispatch } from 'react'
import axios from 'axios'
import message from 'antd/lib/message'

import { IOrder, OrdersAction, OrdersActionTypes, IUpdateOrderPayload } from '../../types/orders'

export const setOrders = (payload: IOrder[]): OrdersAction => ({
  type: OrdersActionTypes.SET_ORDERS,
  payload
})

const setLoading = (payload: boolean): OrdersAction => ({
  type: OrdersActionTypes.SET_ORDERS_LOADING,
  payload
})

export const createOrder = (payload: IOrder): OrdersAction => ({
  type: OrdersActionTypes.CREATE_ORDER,
  payload
})

const removeOrder = (payload: string): OrdersAction => ({
  type: OrdersActionTypes.REMOVE_ORDER,
  payload
})

const updateOrder = (payload: IUpdateOrderPayload): OrdersAction => ({
  type: OrdersActionTypes.UPDATE_ORDER,
  payload
})

export const fetchOrders = (token: string) => (dispatch: Dispatch<OrdersAction>) => {
  dispatch(setLoading(true))
  axios.get('/api/orders', {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setOrders(data)))
    .catch(e => message.error(e.response.data.message))
    .finally(() => dispatch(setLoading(false)))
}

export const fetchCreateOrder = (data: IOrder, token: string, cb: () => void) => (dispatch: Dispatch<OrdersAction>) => {
  axios.post('/api/orders', data, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(createOrder(data))
      message.success('Заказ успешно создан')
      cb()
    })
    .catch(e => message.error(e.response.data.message))
}

export const fetchRemoveOrder = (id: string, token: string) => (dispatch: Dispatch<OrdersAction>) => {
  axios.delete(`/api/orders/${id}`, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(removeOrder(id))
      message.success(data.message)
    })
    .catch(e => message.error(e.response.data.message))
}

export const fetchUpdateOrder = (payload: IUpdateOrderPayload, token: string, cb: () => void) => (dispatch: Dispatch<OrdersAction>) => {
  const { id, data } = payload
  axios.put(`/api/orders/${id}`, data, {
    headers: { Authorization: token}
  })
    .then(({ data }) => {
      dispatch(updateOrder({ id: data._id, data }))
      message.success('Заказ успешно изменен')
      cb()
    })
    .catch(e => message.error(e.response.data.message))
}