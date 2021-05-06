import { model, Schema, Document } from 'mongoose'

export interface IReview {
  _id?: string
  name: string
  date: Date
  text: string
  isProcessed: boolean
}

const reviewSchema = new Schema({
  name: { type: String, required: true },
  date: { type: Date, default: Date.now },
  text: { type: String, required: true },
  isProcessed: { type: Boolean, default: false }
})

export default model<IReview & Document>('Reviews', reviewSchema)