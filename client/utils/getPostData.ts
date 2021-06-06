import { IMainService, IAdditionalService } from '../types/services'

interface IFormValues {
  name: string
  phone?: string
  email?: string
  connection?: string
  address?: string
  date?: { _d: Date }
  comment?: string
  value: number
  main: string
  additionals: { name: string[], value: number }[]
}

const getPostData = (values: IFormValues, main: IMainService[], additional: IAdditionalService[]) => {
  const { main: mainId, additionals, value, date, phone, email, connection } = values

  const { name: mainServiceName, price, units } = main.find(service => service._id === mainId)

  const additionalService = additionals ? additionals.map(service => {
    const options = additional.find(el => el._id === service.name[0]).options
    const option = options.find(el => el._id === service.name[1])
    const { value } = service
    return { ...option, value }
  }) : []

  const data = {
    ...values,
    connection: connection || phone || email,
    date: values.date ? new Date(date._d) : undefined,
    services: {
      main: {
        name: mainServiceName,
        price,
        units,
        value
      },
      additionals: additionalService
    }
  }

  return data
}

export default getPostData