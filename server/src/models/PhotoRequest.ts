import { model, Schema, Document } from 'mongoose'

export interface IPhotoRequest {
  _id?: string
  name: string
  email: string
  isProcessed: boolean
  images: string[]
}

const photoRequestSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  isPisProcessed: { type: Boolean, default: false },
  images: { type: [String], required: true }
})

export default model<IPhotoRequest & Document>('Photo_Request', photoRequestSchema)