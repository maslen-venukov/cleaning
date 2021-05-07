import { Request, Response } from 'express'

import MainService, { IMainService } from '../models/MainService'

import errorHandler from '../utils/errorHandler'
import isValidObjectId from '../utils/isValidObjectId'

import getAllService from '../services/getAll.service'
import getByIdService from '../services/getById.service'
import removeService from '../services/remove.service'

import { HTTPStatusCodes } from '../types'

class mainServiceController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, price, units, includes, info }: IMainService = req.body

      if(!name.trim() || !price || !units.trim() || !includes.length || !info.trim()) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Заполните все поля')
      }

      const mainService = new MainService({
        name,
        price,
        units,
        includes,
        info
      })

      await mainService.save()
      return res.status(HTTPStatusCodes.Created).json(mainService)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      return getAllService(res, MainService)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      return getByIdService(req, res, MainService, 'Услуга')
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

      const mainService = await MainService.findById(id)

      if(!mainService) {
        return errorHandler(res, HTTPStatusCodes.NotFound, 'Услуга не найдена')
      }

      const { name, price, units, includes, info }: IMainService = req.body

      mainService.name = name || mainService.name
      mainService.price = price || mainService.price
      mainService.units = units || mainService.units
      mainService.includes = includes.length ? includes : mainService.includes
      mainService.info = info || mainService.info

      await mainService.save()
      return res.json(mainService)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      return removeService(req, res, MainService, 'Услуга')
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }
}

export default new mainServiceController()