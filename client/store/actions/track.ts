import { Dispatch } from 'react'
import axios from 'axios'

import { ITrack, TrackAction, TrackActionTypes } from '../../types/track'

const setTracks = (payload: ITrack[]): TrackAction => ({
  type: TrackActionTypes.FETCH_TRACKS,
  payload
})

const setTracksError = (payload: string): TrackAction => ({
  type: TrackActionTypes.FETCH_TRACKS_ERROR,
  payload
})

export const fetchTracks = () => async (dispatch: Dispatch<TrackAction>) => {
  try {
    const res = await axios.get('/tracks')
    dispatch(setTracks(res.data))
  } catch (e) {
    dispatch(setTracksError('Ошибка при загрузке треков'))
  }
}