import { Dispatch } from 'react'
import axios from 'axios'
import message from 'antd/lib/message'

import { IPhotoRequest, PhotoRequestsAction, PhotoRequestsActionTypes, IProcessPhotoRequestPayload } from '../../types/photoRequests'

export const setPhotoRequests = (payload: IPhotoRequest[]): PhotoRequestsAction => ({
  type: PhotoRequestsActionTypes.SET_PHOTO_REQUESTS,
  payload
})

const setLoading = (payload: boolean): PhotoRequestsAction => ({
  type: PhotoRequestsActionTypes.SET_PHOTO_REQUESTS_LOADING,
  payload
})

const removePhotoRequest = (payload: string): PhotoRequestsAction => ({
  type: PhotoRequestsActionTypes.REMOVE_PHOTO_REQUEST,
  payload
})

const processPhotoRequest = (payload: IProcessPhotoRequestPayload): PhotoRequestsAction => ({
  type: PhotoRequestsActionTypes.PROCESS_PHOTO_REQUEST,
  payload
})

export const fetchPhotoRequests = (token: string) => (dispatch: Dispatch<PhotoRequestsAction>) => {
  dispatch(setLoading(true))
  axios.get('/api/requests/photo', {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setPhotoRequests(data)))
    .catch(e => message.error(e.response.data.message))
    .finally(() => dispatch(setLoading(false)))
}

export const sendPhotoRequest = (data: FormData, cb: () => void) => {
  axios.post('/api/requests/photo', data)
    .then(() => {
      message.success('Скоро вам на почту будет отправлено сообщение с описанием и стоимостью услуг', 5)
      cb()
    })
    .catch(e => message.error(e.response.data.message))
}

export const fetchRemovePhotoRequest = (id: string, token: string) => (dispatch: Dispatch<PhotoRequestsAction>) => {
  axios.delete(`/api/requests/photo/${id}`, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(removePhotoRequest(id))
      message.success(data.message)
    })
    .catch(e => message.error(e.response.data.message))
}

export const fetchProcessPhotoRequest = (id: string, token: string) => (dispatch: Dispatch<PhotoRequestsAction>) => {
  axios.put(`/api/requests/photo/process/${id}`, {}, {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(processPhotoRequest({ id, isProcessed: data.isProcessed })))
    .catch(e => message.error(e.response.data.message))
}

export const sendEmail = (id: string, price: number, comment: string, token: string, cb: () => void) => {
  const data = { price, comment }
  axios.post(`/api/requests/photo/email/${id}`, data, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      message.success(data.message)
      cb()
    })
    .catch(e => message.error(e.response.data.message))
}