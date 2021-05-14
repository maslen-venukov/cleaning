import { Request, Response } from 'express'

import CalcRequest, { ICalcRequest } from '../models/CalcRequest'

import errorHandler from '../utils/errorHandler'
import isValidObjectId from '../utils/isValidObjectId'
import sendEmail from '../utils/sendEmail'
import getTotalPrice from '../utils/getTotalPrice'

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

      const { main, additionals } = services

      sendEmail({
        from: `Клининговая компания ${process.env.NODEMAILER_USER}`,
        to: email,
        subject: 'Расчет стоимости клининговых услуг',
        html: `
          <table border="1" cellpadding="5">
            <caption>Вид услуги</caption>
            <tr>
              <th>Название</th>
              <th>Цена за ед.</th>
              <th>Ед. изм.</th>
              <th>Значение</th>
              <th>Стоимость</th>
            </tr>
            <tr>
              <td>${main.name}</td>
              <td>${main.price} руб.</td>
              <td>${main.units}</td>
              <td>${main.value}</td>
              <td>${main.value * main.price}</td>
            </tr>
          </table>
          ${additionals.length ? (
            `<br>
            <table border="1" cellpadding="5">
              <caption>Дополнительные услуги</caption>
              <tr>
                <th>Название</th>
                <th>Цена за ед.</th>
                <th>Ед. изм.</th>
                <th>Значение</th>
                <th>Стоимость</th>
              </tr>
              ${additionals.reduce((acc, el) => acc += `
                <tr>
                  <td>${el.name}</td>
                  <td>${el.price} руб.</td>
                  <td>${el.units}</td>
                  <td>${el.value}</td>
                  <td>${el.value * el.price}</td>
                </tr>
              `, '')}
            </table>`
          ) : ''}
          <p>Общая стоимость — ${getTotalPrice(calcRequest)} руб.</p>
        `
      }, async err => {
        if(err) {
          console.log(err)
          return errorHandler(res, HTTPStatusCodes.BadRequest, 'Не удалось отправить email')
        } else {
          await calcRequest.save()
          return res.status(HTTPStatusCodes.Created).json(calcRequest)
        }
      })
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