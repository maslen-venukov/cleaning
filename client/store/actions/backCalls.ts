import { Dispatch } from 'react'
import axios from 'axios'
import message from 'antd/lib/message'

import { setLoading } from './isLoading'

import { IBackCall, BackCallsAction, BackCallsActionTypes, IProcessBackCallPayload } from '../../types/backCalls'
import { LoadingAction } from '../../types/isLoading'

const setBackCalls = (payload: IBackCall[]): BackCallsAction => ({
  type: BackCallsActionTypes.SET_BACK_CALLS,
  payload
})

const removeBackCall = (payload: string): BackCallsAction => ({
  type: BackCallsActionTypes.REMOVE_BACK_CALL,
  payload
})

const processBackCall = (payload: IProcessBackCallPayload): BackCallsAction => ({
  type: BackCallsActionTypes.PROCESS_BACK_CALL,
  payload
})

export const fetchBackCalls = (token: string) => (dispatch: Dispatch<BackCallsAction | LoadingAction>) => {
  dispatch(setLoading(true))
  axios.get('/api/back-calls', {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(setBackCalls(data)))
    .catch(e => message.error(e.response.data.message))
    .finally(() => dispatch(setLoading(false)))
}

export const sendBackCall = (name: string, phone: string) => {
  axios.post('/api/back-calls', { name, phone })
    .then(() => message.success('Заявка успешно отправлена'))
    .catch(e => message.error(e.response.data.message))
}

export const fetchRemoveBackCall = (id: string, token: string) => (dispatch: Dispatch<BackCallsAction>) => {
  axios.delete(`/api/back-calls/${id}`, {
    headers: { Authorization: token }
  })
    .then(({ data }) => {
      dispatch(removeBackCall(id))
      message.success(data.message)
    })
    .catch(e => message.error(e.response.data.message))
}

export const fetchProcessBackCall = (id: string, token: string) => (dispatch: Dispatch<BackCallsAction>) => {
  axios.put(`/api/back-calls/process/${id}`, {}, {
    headers: { Authorization: token }
  })
    .then(({ data }) => dispatch(processBackCall({ id, isProcessed: data.isProcessed })))
    .catch(e => message.error(e.response.data.message))
}