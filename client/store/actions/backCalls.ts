import { Dispatch } from 'react'
import axios from 'axios'
import message from 'antd/lib/message'

import { IBackCall, BackCallsAction, BackCallsActionTypes } from '../../types/backCalls'

const setBackCalls = (payload: IBackCall[]): BackCallsAction => ({
  type: BackCallsActionTypes.SET_BACK_CALLS,
  payload
})

export const fetchBackCalls = () => (dispatch: Dispatch<BackCallsAction>) => {
  axios.get('/api/back-calls')
    .then(({ data }) => dispatch(setBackCalls(data)))
    .catch(e => message.error(e.response.data.message))
}

export const sendBackCall = (name: string, phone: string) => {
  axios.post('/api/back-calls', { name, phone })
    .then(() => message.success('Заявка успешно отправлена'))
    .catch(e => message.error(e.response.data.message))
}