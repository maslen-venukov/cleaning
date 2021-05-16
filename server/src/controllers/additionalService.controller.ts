import { Request, Response } from 'express'

import AdditionalService, { IAdditionalService } from '../models/AdditionalService'

import errorHandler from '../utils/errorHandler'
import isValidObjectId from '../utils/isValidObjectId'

import getAllService from '../services/getAll.service'
import getByIdService from '../services/getById.service'
import removeService from '../services/remove.service'

import { HTTPStatusCodes } from '../types'

class additionalServicesController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, options }: IAdditionalService = req.body

      if(!name.trim() || !options.length) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Заполните все поля')
      }

      const additionalService = new AdditionalService({
        name,
        options
      })

      await additionalService.save()
      return res.status(HTTPStatusCodes.Created).json(additionalService)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      return getAllService(res, AdditionalService)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      return getByIdService(req, res, AdditionalService, 'Услуга', 'а')
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      if(!isValidObjectId(id)) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Некорректный id')
      }

      const additionalService = await AdditionalService.findById(id)

      if(!additionalService) {
        return errorHandler(res, HTTPStatusCodes.NotFound, 'Услуга не найдена')
      }

      const { name, options }: IAdditionalService = req.body

      additionalService.name = name || additionalService.name
      additionalService.options = options?.length ? options : additionalService.options

      await additionalService.save()
      return res.json(additionalService)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      return removeService(req, res, AdditionalService, 'Услуга', 'а')
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }
}

export default new additionalServicesController()