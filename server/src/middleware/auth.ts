import jwt from 'jsonwebtoken'
import { Response, NextFunction } from 'express'

import { IUserRequest } from '../models/User'

import errorHandler from '../utils/errorHandler'

import { HTTPStatusCodes } from '../types'

const SECRET_KEY = process.env.SECRET_KEY

const auth = (req: IUserRequest, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers
    if(!authorization) {
      return errorHandler(res, HTTPStatusCodes.Unauthorized, 'Не удалось авторизоваться' )
    }

    const token = authorization.split(' ')[1]
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded

    next()
  } catch (e) {
    console.log(e)
    return errorHandler(res)
  }
}

export default auth