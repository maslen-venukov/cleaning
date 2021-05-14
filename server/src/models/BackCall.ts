import { model, Schema, Document } from 'mongoose'

export interface IBackCall {
  _id?: string
  phone: string
  name: string
  date: Date
  isProcessed: boolean
}

const backCallSchema = new Schema({
  phone: { type: String, required: true },
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  isProcessed: { type: Boolean, default: false }
})

export default model<IBackCall & Document>('Back_Call', backCallSchema)