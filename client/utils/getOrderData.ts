import { IFormValues } from '../pages/admin/orders'

import { IOrder } from '../types/orders'
import { IMainService, IAdditionalService } from '../types/services'

const getOrderData = (values: IFormValues, main: IMainService[], additional: IAdditionalService[]) => {
  const { name, connection, address, date, comment, value, additionals } = values

  const { name: serviceName, price, units } = main.find(service => service._id === values.main)

  const additionalService = additionals ? additionals.map(service => {
    const options = additional.find(el => el._id === service.name[0]).options
    const option = options.find(el => el._id === service.name[1])
    const { value } = service
    return { ...option, value }
  }) : []

  const data: IOrder = {
    name,
    connection,
    address,
    date: new Date(date._d),
    comment,
    services: {
      main: {
        name: serviceName,
        price: Number(price),
        units,
        value
      },
      additionals: additionalService
    }
  }

  return data
}

export default getOrderData