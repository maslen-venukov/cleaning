import { Dispatch } from 'react'
import axios from 'axios'
import message from 'antd/lib/message'

import { IMainService, IAdditionalService, ServicesAction, ServicesActionTypes, IUpdateServicePayload } from '../../types/services'

const setMainServices = (payload: IMainService[]): ServicesAction => ({
  type: ServicesActionTypes.SET_MAIN_SERVICES,
  payload
})

const setAdditionalServices = (payload: IAdditionalService[]): ServicesAction => ({
  type: ServicesActionTypes.SET_ADDITIONAL_SERVICES,
  payload
})

const setLoading = (payload: boolean): ServicesAction => ({
  type: ServicesActionTypes.SET_SERVICES_LOADING,
  payload
})

const createMainService = (payload: IMainService): ServicesAction => ({
  type: ServicesActionTypes.CREATE_MAIN_SERVICE,
  payload
})

const createAdditionalService = (payload: IAdditionalService): ServicesAction => ({
  type: ServicesActionTypes.CREATE_ADDITIONAL_SERVICE,
  payload
})

const removeMainService = (payload: string): ServicesAction => ({
  type: ServicesActionTypes.REMOVE_MAIN_SERVICE,
  payload
})

const removeAdditionalService = (payload: string): ServicesAction => ({
  type: ServicesActionTypes.REMOVE_ADDITIONAL_SERVICE,
  payload
})

const updateMainService = (payload: IUpdateServicePayload): ServicesAction => ({
  type: ServicesActionTypes.UPDATE_MAIN_SERVICE,
  payload
})

const updateAdditionalService = (payload: IUpdateServicePayload): ServicesAction => ({
  type: ServicesActionTypes.UPDATE_ADDITIONAL_SERVICE,
  payload
})

export const fetchServices = () => (dispatch: Dispatch<ServicesAction>) => {
  dispatch(setLoading(true))

  const requests = [
    axios.get('/api/services/main'),
    axios.get('/api/services/additional')
  ]

  axios.all(requests)
    .then(([{ data: main }, { data: additional }]) => {
      dispatch(setMainServices(main))
      dispatch(setAdditionalServices(additional))
    })
    .catch(e => message.error(e.response.data.message))
    .finally(() => dispatch(setLoading(false)))
}

export const fetchCreateMainService = (data: FormData, token: string, cb: () => void) => (dispatch: Dispatch<ServicesAction>) => {
  axios.post('/api/services/main', data, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(createMainService(data))
      message.success('Услуга успешно создана')
      cb()
    })
    .catch(e => message.error(e.response.data.message))
}

export const fetchCreateAdditionalService = (data: IAdditionalService, token: string, cb: () => void) => (dispatch: Dispatch<ServicesAction>) => {
  axios.post('/api/services/additional', data, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(createAdditionalService(data))
      message.success('Услуга успешно создана')
      cb()
    })
    .catch(e => message.error(e.response.data.message))
}

export const fetchRemoveMainService = (id: string, token: string) => (dispatch: Dispatch<ServicesAction>) => {
  axios.delete(`/api/services/main/${id}`, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(removeMainService(id))
      message.success(data.message)
    })
    .catch(e => message.error(e.response.data.message))
}

export const fetchRemoveAdditionalService = (id: string, token: string) => (dispatch: Dispatch<ServicesAction>) => {
  axios.delete(`/api/services/additional/${id}`, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(removeAdditionalService(id))
      message.success(data.message)
    })
    .catch(e => message.error(e.response.data.message))
}

export const fetchUpdateMainService = (payload: IUpdateServicePayload, token: string, cb: () => void) => (dispatch: Dispatch<ServicesAction>) => {
  const { id, data } = payload
  axios.put(`/api/services/main/${id}`, data, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(updateMainService({ id: data._id, data }))
      message.success('Услуга успешно изменена')
      cb()
    })
    .catch(e => message.error(e.response.data.message))
}

export const fetchUpdateAdditionalService = (payload: IUpdateServicePayload, token: string, cb: () => void) => (dispatch: Dispatch<ServicesAction>) => {
  const { id, data } = payload
  axios.put(`/api/services/additional/${id}`, data, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(updateAdditionalService({ id: data._id, data }))
      message.success('Услуга успешно изменена')
      cb()
    })
    .catch(e => message.error(e.response.data.message))
}