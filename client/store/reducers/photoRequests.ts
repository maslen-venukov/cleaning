import { IPhotoRequestsState, PhotoRequestsAction, PhotoRequestsActionTypes } from '../../types/photoRequests'

const initialState: IPhotoRequestsState = {
  photoRequests: [],
  isLoading: false
}

const photoRequests = (state = initialState, action: PhotoRequestsAction): IPhotoRequestsState => {
  switch(action.type) {
    case PhotoRequestsActionTypes.SET_PHOTO_REQUESTS:
      return {
        ...state,
        photoRequests: action.payload
      }

    case PhotoRequestsActionTypes.SET_PHOTO_REQUESTS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

    case PhotoRequestsActionTypes.REMOVE_PHOTO_REQUEST: {
      const photoRequests = state.photoRequests.filter(photoRequest => photoRequest._id !== action.payload)
      return {
        ...state,
        photoRequests
      }
    }

    case PhotoRequestsActionTypes.PROCESS_PHOTO_REQUEST: {
      const { id, isProcessed } = action.payload
      const photoRequests = state.photoRequests.map(photoRequest => {
        return photoRequest._id === id
          ? { ...photoRequest, isProcessed }
          : photoRequest
      })
      return {
        ...state,
        photoRequests
      }
    }

    default:
      return state
  }
}

export default photoRequests