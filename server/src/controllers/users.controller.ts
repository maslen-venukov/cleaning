import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User, { IUser, IUserRequest } from '../models/User'

import errorHandler from '../utils/errorHandler'

import { HTTPStatusCodes } from '../types'

const SECRET_KEY = process.env.SECRET_KEY

const maxAge = 1000 * 3600 * 24

class UsersController {
  async register(req: Request, res: Response): Promise<Response> {
    try {
      const { login, password }: IUser = req.body
      const { passwordCheck } = req.body

      if(!login.trim() || !password.trim() || !passwordCheck.trim()) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Заполните все поля')
      }

      if(password !== passwordCheck) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Пароли не совпадают' )
      }

      const passwordRegExp = /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{6,}/g
      if(!password.match(passwordRegExp)) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Пароль должен содержать не менее 6 символов, строчные и заглавные буквы латинского алфавита, хотя бы одно число и специальный символ')
      }

      const candidate = await User.findOne({ login })
      if(candidate) {
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Пользователь с таким именем уже зарегистрирован' )
      }

      const hashedPassword = bcrypt.hashSync(password, 7)

      const user = new User({
        login,
        password: hashedPassword
      })

      const { _id } = user

      const token = `Bearer ${jwt.sign({ _id, login }, SECRET_KEY, { expiresIn: '24h' })}`

      await user.save()
      return res
        .status(HTTPStatusCodes.Created)
        .cookie('token', token, {
          httpOnly: true,
          maxAge
        })
        .json({
          token,
          user: { _id, login },
          message: 'Пользователь успешно зарегистрирован'
        })
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { login, password }: IUser = req.body

      if(!login.trim() || !password.trim())
        return errorHandler(res, HTTPStatusCodes.BadRequest, 'Заполните все поля' )

      const user = await User.findOne({ login })
      if(!user) {
        return errorHandler(res, HTTPStatusCodes.Unauthorized, 'Неверный логин или пароль' )
      }

      const isMatch = bcrypt.compareSync(password, user.password)
      if(!isMatch) {
        return errorHandler(res, HTTPStatusCodes.Unauthorized, 'Неверный логин или пароль' )
      }

      const { _id } = user

      const token = `Bearer ${jwt.sign({ _id, login }, SECRET_KEY, { expiresIn: '24h' })}`

      return res
        .cookie('token', token, {
          httpOnly: true,
          maxAge
        })
        .json({
          token,
          currentUser: { _id, login }
        })
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }

  async auth(req: IUserRequest, res: Response): Promise<Response> {
    try {
      const { _id, login } = req.user
      const user = await User.findById(_id)

      const token = `Bearer ${jwt.sign({ _id: user._id, login }, SECRET_KEY, { expiresIn: '24h' })}`

      return res
        .cookie('token', token, {
          httpOnly: true,
          maxAge
        })
        .json({
          token,
          currentUser: {
            _id: user._id,
            login
          }
        })
    } catch (e) {
      console.log(e)
      return errorHandler(res)
    }
  }
}

export default new UsersController()