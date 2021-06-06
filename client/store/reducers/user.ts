import { IUserState, UserAction, UserActionTypes } from '../../types/user'

const initialState: IUserState = {
  token: null,
  currentUser: null,
  isReady: false
}

const user = (state = initialState, action: UserAction): IUserState => {
  const { type, payload } = action

  switch(type) {
    case UserActionTypes.SET_USER:
      const { token, currentUser } = payload
      return {
        ...state,
        token,
        currentUser
      }

    case UserActionTypes.SET_READY:
      return {
        ...state,
        isReady: true
      }

    case UserActionTypes.LOG_OUT:
      document.cookie = `token=;expires=${new Date(0)}`
      return {
        ...state,
        token: null,
        currentUser: null
      }

    default:
      return state
  }
}

export default user