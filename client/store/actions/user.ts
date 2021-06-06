import { Dispatch } from 'react'
import axios from 'axios'
import message from 'antd/lib/message'

import { IUserState, UserAction, UserActionTypes } from '../../types/user'

const setUser = (payload: IUserState): UserAction => ({
  type: UserActionTypes.SET_USER,
  payload
})

export const logOut = (): UserAction => ({
  type: UserActionTypes.LOG_OUT
})

export const setReady = (): UserAction => ({
  type: UserActionTypes.SET_READY
})

export const logIn = (login: string, password: string, cb: () => void) => (dispatch: Dispatch<UserAction>) => {
  axios.post('/api/users/login', {
    login,
    password
  })
    .then(({ data }) => {
      dispatch(setUser(data))
      message.success('Авторизация выполнена успешно')
      cb()
    })
    .catch(e => message.error(e.response.data.message))
}

export const auth = () => (dispatch: Dispatch<UserAction>) => {
  axios.get('/api/users/auth')
    .then(({ data }) => dispatch(setUser(data)))
    .catch(e => {
      console.log(e.response.data.message)
      dispatch(logOut())
    })
    .finally(() => dispatch(setReady()))
}