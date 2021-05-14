import { IOrder } from '../models/Order'
import { ICalcRequest } from '../models/CalcRequest'

const getTotalPrice = (order: IOrder | ICalcRequest) => {
  if(!order) {
    return null
  }

  const { main, additionals } = order.services
  const { price, value } = main

  const mainPrice = price * value
  const additionalPrice = additionals.reduce((acc, el) => acc += el.price * el.value, 0)

  return mainPrice + additionalPrice
}

export default getTotalPrice