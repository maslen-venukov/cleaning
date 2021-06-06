import { Dispatch } from 'react'
import axios from 'axios'
import message from 'antd/lib/message'

import { IReview, ReviewsAction, ReviewsActionTypes, IUpdateReviewPayload } from '../../types/reviews'

export const setReviews = (payload: IReview[]): ReviewsAction => ({
  type: ReviewsActionTypes.SET_REVIEWS,
  payload
})

const setLoading = (payload: boolean): ReviewsAction => ({
  type: ReviewsActionTypes.SET_REVIEWS_LOADING,
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

export const fetchReviews = () => (dispatch: Dispatch<ReviewsAction>) => {
  dispatch(setLoading(true))
  axios.get('/api/reviews/processed')
    .then(({ data }) => dispatch(setReviews(data)))
    .catch(e => message.error(e.response.data.message))
    .finally(() => dispatch(setLoading(false)))
}

export const fetchAllReviews = () => (dispatch: Dispatch<ReviewsAction>) => {
  dispatch(setLoading(true))
  axios.get('/api/reviews')
    .then(({ data }) => dispatch(setReviews(data)))
    .catch(e => message.error(e.response.data.message))
    .finally(() => dispatch(setLoading(false)))
}

export const fetchUpdateReview = (payload: IUpdateReviewPayload, cb?: () => void) => (dispatch: Dispatch<ReviewsAction>) => {
  const { id, data } = payload
  axios.put(`/api/reviews/${id}`, data)
    .then(({ data }) => {
      dispatch(updateReview({ id: data._id, data }))
      if(cb) {
        cb()
      }
    })
    .catch(e => message.error(e.response.data.message))
}

export const fetchRemoveReview = (id: string) => (dispatch: Dispatch<ReviewsAction>) => {
  axios.delete(`/api/reviews/${id}`)
    .then(({ data }) => {
      dispatch(removeReview(id))
      message.success(data.message)
    })
    .catch(e => message.error(e.response.data.message))
}

export const sendReview = (name: string, text: string) => (dispatch: Dispatch<ReviewsAction>) => {
  axios.post('/api/reviews', { name, text })
    .then(() => message.info('Отзыв отправлен на обработку'))
    .catch(e => message.error(e.response.data.message))
}