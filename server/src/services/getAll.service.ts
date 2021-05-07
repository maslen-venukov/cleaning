import { Response } from 'express'
import { Model } from 'mongoose'

const getAll = async (res: Response, model: Model<any>): Promise<Response> => {
  const documents = await model.find().sort({ _id: -1 })
  return res.json(documents)
}

export default getAll