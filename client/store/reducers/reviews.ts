import { ReviewsState, ReviewsAction, ReviewsActionTypes } from '../../types/reviews'

const initialState: ReviewsState = []

const reviews = (state = initialState, action: ReviewsAction): ReviewsState => {
  switch(action.type) {
    case ReviewsActionTypes.SET_REVIEWS:
      return action.payload

    case ReviewsActionTypes.UPDATE_REVIEW:
      const { id, data } = action.payload
      return state.map(review => {
        return review._id === id
          ? { ...review, ...data }
          : review
      })

    case ReviewsActionTypes.REMOVE_REVIEW:
      return state.filter(review => review._id !== action.payload)

    default:
      return state
  }
}

export default reviews