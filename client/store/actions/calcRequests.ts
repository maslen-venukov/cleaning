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

export const fetchCalcRequests = () => (dispatch: Dispatch<CalcRequestsAction>) => {
  dispatch(setLoading(true))
  axios.get('/api/requests/calc')
    .then(({ data }) => dispatch(setCalcRequests(data)))
    .catch(e => message.error(e.response.data.message))
    .finally(() => dispatch(setLoading(false)))
}

export const sendCalcRequest = (data: ICalcRequest, cb: () => void) => {
  axios.post('/api/requests/calc', data)
    .then(() => {
      message.success('Вам на почту отправлено сообщение с описанием и стоимостью услуг', 5)
      cb()
    })
    .catch(e => message.error(e.response.data.message))
}

export const fetchRemoveCalcRequest = (id: string) => (dispatch: Dispatch<CalcRequestsAction>) => {
  axios.delete(`/api/requests/calc/${id}`)
    .then(({ data }) => {
      dispatch(removeCalcRequest(id))
      message.success(data.message)
    })
    .catch(e => message.error(e.response.data.message))
}

export const fetchProcessCalcRequest = (id: string) => (dispatch: Dispatch<CalcRequestsAction>) => {
  axios.put(`/api/requests/calc/process/${id}`)
    .then(({ data }) => dispatch(processCalcRequest({ id, isProcessed: data.isProcessed })))
    .catch(e => message.error(e.response.data.message))
}