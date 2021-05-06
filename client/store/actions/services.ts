import { Dispatch } from 'react'
import axios from 'axios'
import message from 'antd/lib/message'

import { setLoading } from './isLoading'

import { IMainService, IAdditionalService, ServicesAction, ServicesActionTypes } from '../../types/services'
import { LoadingAction } from '../../types/isLoading'

const setMainServices = (payload: IMainService[]): ServicesAction => ({
  type: ServicesActionTypes.SET_MAIN_SERVICES,
  payload
})

const setAdditionalServices = (payload: IAdditionalService[]): ServicesAction => ({
  type: ServicesActionTypes.SET_ADDITIONAL_SERVICES,
  payload
})

export const fetchMainServices = () => (dispatch: Dispatch<ServicesAction | LoadingAction>) => {
  dispatch(setLoading(true))
  axios.get('/api/services/main')
    .then(({ data }) => dispatch(setMainServices(data)))
    .catch(e => message.error(e.response.data.message))
    .finally(() => dispatch(setLoading(false)))
}