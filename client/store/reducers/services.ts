import { IServicesState, ServicesAction, ServicesActionTypes } from '../../types/services'

const initialState: IServicesState = {
  main: [],
  additional: [],
  isLoading: false
}

const services = (state = initialState, action: ServicesAction): IServicesState => {
  switch(action.type) {
    case ServicesActionTypes.SET_MAIN_SERVICES:
      return {
        ...state,
        main: action.payload
      }

    case ServicesActionTypes.SET_ADDITIONAL_SERVICES:
      return {
        ...state,
        additional: action.payload
      }

    case ServicesActionTypes.SET_SERVICES_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

    default:
      return state
  }
}

export default services