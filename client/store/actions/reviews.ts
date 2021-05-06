import { Dispatch } from 'react'
import axios from 'axios'
import message from 'antd/lib/message'

import { IReview, ReviewsAction, ReviewsActionTypes, IUpdateReviewPayload } from '../../types/reviews'

export const setReviews = (payload: IReview[]): ReviewsAction => ({
  type: ReviewsActionTypes.SET_REVIEWS,
  payload
})

const updateReview = (payload: IUpdateReviewPayload): ReviewsAction => ({
  type: ReviewsActionTypes.UPDATE_REVIEW,
  payload
})

const removeReview = (payload: string): ReviewsAction => ({
  type: ReviewsActionTypes.REMOVE_REVIEW,
  payload
})

export const setReviewsError = (payload: string) => ({
  type: ReviewsActionTypes.SET_REVIEWS_ERROR,
  payload
})

export const fetchReviews = () => (dispatch: Dispatch<ReviewsAction>) => {
  axios.get('/api/reviews/processed')
    .then(({ data }) => dispatch(setReviews(data)))
    .catch(e => message.error(e.response.data.message))
}