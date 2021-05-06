import { createStore, applyMiddleware, AnyAction } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createWrapper, Context, MakeStore } from 'next-redux-wrapper'
import thunk, { ThunkDispatch } from 'redux-thunk'

import rootReducer, { RootState } from './reducers'

const makeStore: MakeStore<RootState> = (context: Context) => createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export const wrapper = createWrapper<RootState>(makeStore, { debug: true })

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>