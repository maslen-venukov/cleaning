import { model, Schema, Document } from 'mongoose'

export interface IMainService {
  _id?: string
  name: string
  price: number
  units: string
  includes: string[]
  info: string
}

const mainServiceSchema = new Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true, min: 0 },
  units: { type: String, required: true },
  includes: { type: [String], required: true },
  info: { type: String, required: true }
})

export default model<IMainService & Document>('Main_Services', mainServiceSchema)