import React from 'react'

import HomeBtn from '../components/HomeBtn'

import Result from 'antd/lib/result'

const NotFound: React.FC = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Страница не найдена"
      extra={<HomeBtn />}
    />
  )
}

export default NotFound