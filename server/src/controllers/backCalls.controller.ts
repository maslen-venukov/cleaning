import { Request, Response } from 'express'

import BackCall from '../models/BackCall'

import errorHandler from '../utils/errorHandler'

import { HTTPStatusCodes } from '../types'
import { IUserRequest } from '../models/User'

class backCallsController {
  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const backCalls = await BackCall.find().sort({ _id: -1 })
      return res.json(backCalls)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, phone } = req.body

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
      return res.json(backCall)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      await BackCall.deleteOne({ _id: id })
      return res.json({ message: 'Заявка успешно удалена' })
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async process(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params
      const backCall = await BackCall.findById(id)
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