import { AppProps } from 'next/app'
import axios from 'axios'

import { wrapper } from '../store'

import '../styles/index.sass'

axios.defaults.baseURL = 'http://localhost:5000'

const WrappedApp: React.FC<AppProps> = ({Component, pageProps}) => (
    <Component {...pageProps} />
)

export default wrapper.withRedux(WrappedApp)