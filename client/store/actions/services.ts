import { Dispatch } from 'react'
import axios from 'axios'
import message from 'antd/lib/message'

import { IMainService, IAdditionalService, ServicesAction, ServicesActionTypes } from '../../types/services'

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