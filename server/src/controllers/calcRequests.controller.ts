import { Request, Response } from 'express'

import CalcRequest, { ICalcRequest } from '../models/CalcRequest'

import errorHandler from '../utils/errorHandler'
import isValidObjectId from '../utils/isValidObjectId'

import getAllService from '../services/getAll.service'
import getByIdService from '../services/getById.service'
import removeService from '../services/remove.service'

import { HTTPStatusCodes } from '../types'

class requestController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, services }: ICalcRequest = req.body

      if(!name.trim() || !email.trim()) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Заполните все поля')
      }

      const { name: serviceName, price, units, value } = services.main
      if(!serviceName.trim() || !price || !units.trim() || !value) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Заполните все поля')
      }

      const calcRequest = new CalcRequest({
        name,
        email,
        services
      })

      await calcRequest.save()
      return res.status(HTTPStatusCodes.Created).json(calcRequest)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      return getAllService(res, CalcRequest)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      return getByIdService(req, res, CalcRequest, 'Заявка', 'а')
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

      const calcRequest = await CalcRequest.findById(id)

      if(!calcRequest) {
        return errorHandler(res, HTTPStatusCodes.NotFound, 'Заявка не найдена')
      }

      calcRequest.isProcessed = !calcRequest.isProcessed
      await calcRequest.save()
      return res.json(calcRequest)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      return removeService(req, res, CalcRequest, 'Заявка', 'а')
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }
}

export default new requestController()