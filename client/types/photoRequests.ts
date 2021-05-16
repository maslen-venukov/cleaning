import { IAction } from '.'

export interface IPhotoRequest {
  _id?: string
  name: string
  email: string
  date: Date
  isProcessed: boolean
  images: string[]
}

export enum PhotoRequestsActionTypes {
  SET_PHOTO_REQUESTS = 'SET_PHOTO_REQUESTS',
  SET_PHOTO_REQUESTS_LOADING = 'SET_PHOTO_REQUESTS_LOADING',
  REMOVE_PHOTO_REQUEST = 'REMOVE_PHOTO_REQUEST',
  PROCESS_PHOTO_REQUEST = 'PROCESS_PHOTO_REQUEST'
}

export interface IPhotoRequestsState {
  photoRequests: IPhotoRequest[]
  isLoading: boolean
}

export interface IProcessPhotoRequestPayload {
  id: string,
  isProcessed: boolean
}

interface ISetPhotoRequests extends IAction {
  type: PhotoRequestsActionTypes.SET_PHOTO_REQUESTS,
  payload: IPhotoRequest[]
}

interface ISetPhotoRequestsLoading extends IAction {
  type: PhotoRequestsActionTypes.SET_PHOTO_REQUESTS_LOADING,
  payload: boolean
}

interface IRemovePhotoRequest extends IAction {
  type: PhotoRequestsActionTypes.REMOVE_PHOTO_REQUEST,
  payload: string
}

interface IProcessPhotoRequest extends IAction {
  type: PhotoRequestsActionTypes.PROCESS_PHOTO_REQUEST,
  payload: IProcessPhotoRequestPayload
}

export type PhotoRequestsAction = ISetPhotoRequests | ISetPhotoRequestsLoading | IRemovePhotoRequest | IProcessPhotoRequest