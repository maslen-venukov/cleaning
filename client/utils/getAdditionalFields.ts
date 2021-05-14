import { IAdditionalService } from '../types/services'
import { IOrder } from '../types/orders'
import { ICalcRequest } from '../types/calcRequests'

const getAdditionalFields = (additional: IAdditionalService[], record: IOrder | ICalcRequest) => {
  const { additionals } = record.services
  const result = additionals.map(service => {
    const parent = additional.find(el => el.options.find(option => option.name === service.name))

    if(!parent) {
      return {
        name: [service.name],
        value: service.value
      }
    }

    const child = parent.options.find(option => option.name === service.name)

    return {
      name: [parent._id, child._id],
      value: service.value
    }
  })
  return result
}

export default getAdditionalFields