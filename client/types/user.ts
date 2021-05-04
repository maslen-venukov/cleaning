import { IAction } from '.'

export enum UserActionTypes {
  SET_USER = 'SET_USER',
  LOG_OUT = 'LOG_OUT',
  SET_READY = 'SET_READY'
}

interface IUser {
  _id: string
  login: string
}

export interface IUserState {
  token: string | null
  currentUser: IUser | null
  isReady: boolean
}

interface ISetUser extends IAction {
  type: UserActionTypes.SET_USER,
  payload: {
    token: string
    currentUser: IUser
  }
}

interface ILogOut extends IAction {
  type: UserActionTypes.LOG_OUT
}

interface ISetReady extends IAction {
  type: UserActionTypes.SET_READY
}

export type UserAction = ISetUser | ILogOut | ISetReady