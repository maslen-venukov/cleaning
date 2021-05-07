import { Request, Response } from 'express'

import BackCall, { IBackCall } from '../models/BackCall'

import errorHandler from '../utils/errorHandler'
import isValidObjectId from '../utils/isValidObjectId'

import getAllService from '../services/getAll.service'
import removeService from '../services/remove.service'

import { HTTPStatusCodes } from '../types'

class backCallsController {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      return getAllService(res, BackCall)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, phone }: IBackCall = req.body

      if(!name.trim() || !phone.trim()) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Заполните все поля')
      }

      const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
      if(!phone.match(phoneRegExp)) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Некорректный формат номера телефона')
      }

      const backCall = new BackCall({
        name,
        phone
      })

      await backCall.save()
      return res.status(HTTPStatusCodes.Created).json(backCall)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      return removeService(req, res, BackCall, 'Заявка')
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async process(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      if(!isValidObjectId(id)) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Некорректный id')
      }

      const backCall = await BackCall.findById(id)

      if(!backCall) {
        return errorHandler(res, HTTPStatusCodes.NotFound, 'Заявка не найдена')
      }

      backCall.isProcessed = !backCall.isProcessed
      await backCall.save()
      return res.json(backCall)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }
}

export default new backCallsController()