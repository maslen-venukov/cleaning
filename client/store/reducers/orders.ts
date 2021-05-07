import { IOrdersState, OrdersAction, OrdersActionTypes } from '../../types/orders'

const initialState: IOrdersState = {
  orders: [],
  isLoading: false
}

const orders = (state = initialState, action: OrdersAction): IOrdersState => {
  switch(action.type) {
    case OrdersActionTypes.SET_ORDERS:
      return {
        ...state,
        orders: action.payload
      }

    case OrdersActionTypes.SET_ORDERS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

    case OrdersActionTypes.UPDATE_ORDER: {
      const { id, data } = action.payload
      const orders = state.orders.map(order => {
        return order._id === id
          ? { ...order, ...data }
          : order
      })
      return {
        ...state,
        orders
      }
    }

    case OrdersActionTypes.REMOVE_ORDER: {
      const orders = state.orders.filter(order => order._id !== action.payload)
      return {
        ...state,
        orders
      }
    }

    default:
      return state
  }
}

export default orders