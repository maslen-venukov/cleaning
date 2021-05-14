import { model, Schema, Document } from 'mongoose'

import { IService } from '../types'

export interface IOrder {
  _id?: string
  name: string
  connection: string
  address: string
  date: Date
  isCompleted: boolean
  comment?: string
  services: {
    main: IService,
    additionals?: IService[]
  }
}

const orderSchema = new Schema({
  name: { type: String, required: true },
  connection: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: Date, required: true },
  isCompleted: { type: Boolean, default: false },
  comment: { type: String },
  services: {
    main: {
      name: { type: String, required: true },
      price: { type: Number, required: true, min: 0 },
      units: { type: String, required: true },
      value: { type: Number, required: true, min: 0 }
    },
    additionals: {
      type: [{
        name: { type: String, required: true },
        price: { type: Number, required: true, min: 0 },
        units: { type: String, required: true },
        value: { type: Number, required: true, min: 0 }
      }]
    }
  }
})

export default model<IOrder & Document>('Orders', orderSchema)