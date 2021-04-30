import { ITrackState, TrackAction, TrackActionTypes } from '../../types/track'

const initialState: ITrackState = {
  tracks: [],
  error: ''
}

const track = (state = initialState, action: TrackAction): ITrackState => {
  switch(action.type) {
    case TrackActionTypes.FETCH_TRACKS:
      return {
        ...state,
        tracks: action.payload
      }

    case TrackActionTypes.FETCH_TRACKS_ERROR:
      return {
        ...state,
        error: action.payload
      }

    default:
      return state
  }
}

export default track