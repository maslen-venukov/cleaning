import { Request, Response } from 'express'
import { Model } from 'mongoose'

import errorHandler from '../utils/errorHandler'
import isValidObjectId from '../utils/isValidObjectId'

import { HTTPStatusCodes } from '../types'

const remove = async (req: Request, res: Response, model: Model<any>, modelName: string, ending = ''): Promise<Response> => {
  const { id } = req.params

  if(!isValidObjectId(id)) {
    return errorHandler(res, HTTPStatusCodes.BadRequest, 'Некорректный id')
  }

  const document = await model.findById(id)

  if(!document) {
    return errorHandler(res, HTTPStatusCodes.NotFound, `${modelName} не найден${ending || ''}`)
  }

  await document.deleteOne()
  return res.json({ message: `${modelName} успешно удален${ending || ''}` })
}

export default remove