import { IAction } from '.'

export interface IReview {
  _id: string
  name: string
  text: string
  date: Date
  isProcessed: boolean
}

export enum ReviewsActionTypes {
  SET_REVIEWS = 'SET_REVIEWS',
  UPDATE_REVIEW = 'UPDATE_REVIEW',
  REMOVE_REVIEW = 'REMOVE_REVIEW'
}

export type ReviewsState = IReview[]

export interface IUpdateReviewPayload {
  id: string,
  data: {
    name?: string
    text?: string
    isProcessed?: boolean
  }
}

interface ISetReviews extends IAction {
  type: ReviewsActionTypes.SET_REVIEWS,
  payload: IReview[]
}

interface IUpdateReview extends IAction {
  type: ReviewsActionTypes.UPDATE_REVIEW,
  payload: IUpdateReviewPayload
}

interface IRemoveReview extends IAction {
  type: ReviewsActionTypes.REMOVE_REVIEW,
  payload: string
}

export type ReviewsAction = ISetReviews | IUpdateReview | IRemoveReview