import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'

import { IUserRequest } from '../models/User'

import errorHandler from '../utils/errorHandler'

import { HTTPStatusCodes } from '../types'

const SECRET_KEY = process.env.SECRET_KEY

const auth = (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies
    if(!token) {
      return errorHandler(res, HTTPStatusCodes.Unauthorized, 'Не удалось авторизоваться' )
    }

    const decoded = jwt.verify(token.split(' ')[1], SECRET_KEY)
    req.user = decoded

    next()
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}

export default auth