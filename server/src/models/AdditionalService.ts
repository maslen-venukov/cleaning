import { model, Schema, Document } from 'mongoose'

interface IAdditionalServiceOption {
  name: string
  price: number
  units: string
}

export interface IAdditionalService {
  _id?: string
  name: string
  options: IAdditionalServiceOption[]
}

const additionalServiceSchema = new Schema({
  name: { type: String, required: true, unique: true },
  options: {
    type: [{
      name: { type: String, required: true, unique: true },
      price: { type: Number, required: true, min: 0 },
      units: { type: String, required: true }
    }],
    required: true
  }
})

export default model<IAdditionalService & Document>('Additional_Services', additionalServiceSchema)