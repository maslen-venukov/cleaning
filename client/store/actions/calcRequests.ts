import { Dispatch } from 'react'
import axios from 'axios'
import message from 'antd/lib/message'

import { ICalcRequest, CalcRequestsAction, CalcRequestsActionTypes, IProcessCalcRequestPayload } from '../../types/calcRequests'

export const setCalcRequests = (payload: ICalcRequest[]): CalcRequestsAction => ({
  type: CalcRequestsActionTypes.SET_CALC_REQUESTS,
  payload
})

const setLoading = (payload: boolean): CalcRequestsAction => ({
  type: CalcRequestsActionTypes.SET_CALC_REQUESTS_LOADING,
  payload
})

const removeCalcRequest = (payload: string): CalcRequestsAction => ({
  type: CalcRequestsActionTypes.REMOVE_CALC_REQUEST,
  payload
})

const processCalcRequest = (payload: IProcessCalcRequestPayload): CalcRequestsAction => ({
  type: CalcRequestsActionTypes.PROCESS_CALC_REQUEST,
  payload
})

export const fetchCalcRequests = (token: string) => (dispatch: Dispatch<CalcRequestsAction>) => {
  dispatch(setLoading(true))
  axios.get('/api/requests/calc', {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setCalcRequests(data)))
    .catch(e => message.error(e.response.data.message))
    .finally(() => dispatch(setLoading(false)))
}

export const sendCalcRequest = (data: ICalcRequest) => {
  axios.post('/api/requests/calc', data)
    .then(() => message.success('Вам на почту отправлено сообщение с описанием и стоимостью услуг', 5))
    .catch(e => message.error(e.response.data.message))
}

export const fetchRemoveCalcRequest = (id: string, token: string) => (dispatch: Dispatch<CalcRequestsAction>) => {
  axios.delete(`/api/requests/calc/${id}`, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(removeCalcRequest(id))
      message.success(data.message)
    })
    .catch(e => message.error(e.response.data.message))
}

export const fetchProcessCalcRequest = (id: string, token: string) => (dispatch: Dispatch<CalcRequestsAction>) => {
  axios.put(`/api/requests/calc/process/${id}`, {}, {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(processCalcRequest({ id, isProcessed: data.isProcessed })))
    .catch(e => message.error(e.response.data.message))
}