import { Request, Response } from 'express'

import Review, { IReview } from '../models/Review'

import errorHandler from '../utils/errorHandler'
import isValidObjectId from '../utils/isValidObjectId'

import { HTTPStatusCodes } from '../types'

class reviewsController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name, text }: IReview = req.body

      if(!name.trim() || !text.trim()) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Заполните все поля')
      }

      const review = new Review({
        name,
        text
      })

      await review.save()
      return res.status(HTTPStatusCodes.Created).json(review)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const reviews = await Review.find().sort({ _id: -1 })
      return res.json(reviews)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async getProcessed(req: Request, res: Response): Promise<Response> {
    try {
      const reviews = await Review.find({ isProcessed: true }).sort({ _id: -1 })
      return res.json(reviews)
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

      const review = await Review.findById(id)

      if(!review) {
        return errorHandler(res, HTTPStatusCodes.NotFound, 'Отзыв не найден')
      }

      const { name, text, isProcessed }: IReview = req.body

      review.name = name || review.name
      review.text = text || review.text
      review.isProcessed = isProcessed !== undefined ? isProcessed : review.isProcessed

      await review.save()
      return res.json(review)
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async remove(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params

      if(!isValidObjectId(id)) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Некорректный id')
      }

      const review = await Review.findById(id)

      if(!review) {
        return errorHandler(res, HTTPStatusCodes.NotFound, 'Отзыв не найден')
      }

      await review.deleteOne()
      return res.json({ message: 'Отзыв успешно удален' })
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }
}

export default new reviewsController()