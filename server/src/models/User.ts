import { model, Schema, Document } from 'mongoose'
import { Request } from 'express'

export interface IUser {
  _id?: string
  login: string
  password: string
}

export interface IUserRequest extends Request { user: IUser }

const userSchema = new Schema({
  login: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

export default model<IUser & Document>('User', userSchema)