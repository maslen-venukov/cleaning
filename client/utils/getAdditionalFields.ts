import { IAdditionalService } from '../types/services'
import { IOrder } from '../types/orders'

const getAdditionalFields = (additional: IAdditionalService[], record: IOrder) => {
  const { additionals } = record.services
  const result = additionals.map(service => {
    const parent = additional.find(el => el.options.find(option => option._id === service._id))
    const child = parent.options.find(option => option._id === service._id)
    return {
      name: [parent._id, child._id],
      value: service.value
    }
  })
  return result
}

export default getAdditionalFields