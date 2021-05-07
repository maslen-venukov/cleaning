import { Request, Response } from 'express'

import Order, { IOrder } from '../models/Order'

import errorHandler from '../utils/errorHandler'
import isValidObjectId from '../utils/isValidObjectId'

import removeService from '../services/remove.service'

import { HTTPStatusCodes } from '../types'

class ordersController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, connection, date, services }: IOrder = req.body

      console.log(req.body)

      if(!name.trim() || !connection.trim() || !date) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Заполните все поля')
      }

      const { name: serviceName, price, units, value } = services.main
      if(!serviceName.trim() || !price || !units.trim() || !value) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Заполните все поля')
      }

      const order = new Order({
        name,
        connection,
        date,
        services
      })

      await order.save()
      return res.status(HTTPStatusCodes.Created).json(order)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const orders = await Order.find().sort({ _id: -1 })
      return res.json(orders)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      if(!isValidObjectId(id)) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Некорректный id')
      }

      const order = await Order.findById(id)

      if(!order) {
        return errorHandler(res, HTTPStatusCodes.NotFound, 'Заказ не найден')
      }

      return res.json(order)
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

      const order = await Order.findById(id)

      if(!order) {
        return errorHandler(res, HTTPStatusCodes.NotFound, 'Заказ не найден')
      }

      const { name, connection, date, services }: IOrder = req.body

      order.name = name || order.name
      order.connection = connection || order.connection
      order.date = date || order.date
      order.services = services || order.services

      await order.save()
      return res.json(order)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      return removeService(req, res, Order, 'Заказ')
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }
}

export default new ordersController()