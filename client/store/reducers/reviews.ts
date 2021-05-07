import { IReviewsState, ReviewsAction, ReviewsActionTypes } from '../../types/reviews'

const initialState: IReviewsState = {
  reviews: [],
  isLoading: false
}

const reviews = (state = initialState, action: ReviewsAction): IReviewsState => {
  switch(action.type) {
    case ReviewsActionTypes.SET_REVIEWS:
      return {
        ...state,
        reviews: action.payload
      }

    case ReviewsActionTypes.SET_REVIEWS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      }

    case ReviewsActionTypes.UPDATE_REVIEW: {
      const { id, data } = action.payload
      const reviews = state.reviews.map(review => {
        return review._id === id
          ? { ...review, ...data }
          : review
      })
      return {
        ...state,
        reviews
      }
    }

    case ReviewsActionTypes.REMOVE_REVIEW: {
      const reviews = state.reviews.filter(review => review._id !== action.payload)
      return {
        ...state,
        reviews
      }
    }

    default:
      return state
  }
}

export default reviews