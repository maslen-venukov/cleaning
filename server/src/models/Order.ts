import { model, Schema, Document } from 'mongoose'

import { IAdditionalServiceOption } from './AdditionalService'

interface IOrderAdditional {
  name: string
  options: IAdditionalServiceOption & { value: number }
}

export interface IOrder {
  _id?: string
  name: string
  connection: string
  date: Date
  services: {
    main: {
      name: string
      price: number
      units: string
      value: number
    },
    additionals?: IOrderAdditional[]
  }
}

const ordersSchema = new Schema({
  name: { type: String, required: true },
  connection: { type: String, required: true },
  date: { type: Date, required: true },
  services: {
    main: {
      name: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      units: { type: String, required: true },
      value: { type: Number, required: true, min: 0 }
    },
    additionals: {
      type: [{
        name: { type: String, required: true, unique: true },
        price: { type: Number, required: true, min: 0 },
        units: { type: String, required: true },
        value: { type: Number, required: true, min: 0 }
      }]
    }
  }
})

export default model<IOrder & Document>('Orders', ordersSchema)