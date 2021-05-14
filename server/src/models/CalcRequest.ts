import { model, Schema, Document } from 'mongoose'

import { IService } from '../types'

export interface ICalcRequest {
  _id?: string
  name: string
  email: string
  date: Date
  isProcessed: boolean
  services: {
    main: IService,
    additionals?: IService[]
  }
}

const calcRequestSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isProcessed: { type: Boolean, default: false },
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

export default model<ICalcRequest & Document>('Calc_Request', calcRequestSchema)