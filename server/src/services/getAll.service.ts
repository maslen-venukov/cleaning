import { Response } from 'express'
import { Model } from 'mongoose'

const getAll = async (res: Response, model: Model<any>, find = {}, sort = { _id: -1 }): Promise<Response> => {
  const documents = await model.find(find).sort(sort)
  return res.json(documents)
}

export default getAll