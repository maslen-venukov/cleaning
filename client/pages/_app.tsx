import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import axios from 'axios'
import cookie from 'cookie'

import ConfigProvider from 'antd/lib/config-provider'
import locale from 'antd/lib/locale/ru_RU'

import { wrapper } from '../store'

import { auth, setReady } from '../store/actions/user'
import { fetchServices } from '../store/actions/services'

import { API_URL } from '../types'
import { RootState } from '../store/reducers'

import '../styles/index.sass'

axios.defaults.baseURL = API_URL
axios.defaults.withCredentials = true

const WrappedApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { currentUser, isReady } = useSelector((state: RootState) => state.user)

  useEffect(() => {
    dispatch(auth())
    dispatch(fetchServices())
  }, [])

  useEffect(() => {
    if(router.pathname.includes('admin') && isReady && !currentUser) {
      router.push('/login')
    }
  }, [isReady, currentUser])

  return (
    <ConfigProvider locale={locale}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}

export default wrapper.withRedux(WrappedApp)