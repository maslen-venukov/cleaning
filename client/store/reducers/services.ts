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

    case ServicesActionTypes.CREATE_MAIN_SERVICE:
      return {
        ...state,
        main: [action.payload, ...state.main]
      }

    case ServicesActionTypes.CREATE_ADDITIONAL_SERVICE:
      return {
        ...state,
        additional: [action.payload, ...state.additional]
      }

    case ServicesActionTypes.REMOVE_MAIN_SERVICE: {
      const main = state.main.filter(service => service._id !== action.payload)
      return {
        ...state,
        main
      }
    }

    case ServicesActionTypes.REMOVE_ADDITIONAL_SERVICE: {
      const additional = state.additional.filter(service => service._id !== action.payload)
      return {
        ...state,
        additional
      }
    }

    case ServicesActionTypes.UPDATE_MAIN_SERVICE: {
      const main = state.main.map(service => {
        return service._id === action.payload.id
          ? { ...service, ...action.payload.data }
          : service
      })
      return {
        ...state,
        main
      }
    }

    case ServicesActionTypes.UPDATE_ADDITIONAL_SERVICE: {
      const additional = state.additional.map(service => {
        return service._id === action.payload.id
          ? { ...service, ...action.payload.data }
          : service
      })
      return {
        ...state,
        additional
      }}

    default:
      return state
  }
}

export default services