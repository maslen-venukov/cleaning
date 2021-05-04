import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import axios from 'axios'

import { wrapper } from '../store'

import { auth, setReady } from '../store/actions/user'

import { RootState } from '../store/reducers'

import '../styles/index.sass'

axios.defaults.baseURL = 'http://localhost:5000'

const WrappedApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { currentUser, isReady } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) {
      dispatch(auth(token))
    } else {
      dispatch(setReady())
    }
  }, [])

  useEffect(() => {
    if(router.pathname.includes('admin') && isReady && !currentUser) {
      router.push('/')
    }
  }, [isReady, currentUser])

  return isReady && <Component {...pageProps} />
}

export default wrapper.withRedux(WrappedApp)