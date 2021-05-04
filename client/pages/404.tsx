import React from 'react'

import Result from 'antd/lib/result'
import Button from 'antd/lib/button'
import Link from 'next/link'

const NotFound: React.FC = () => {
  const renderHomeBtn = () => (
    <Button type="primary">
      <Link href="/">
        <a>Перейти на главную</a>
      </Link>
    </Button>
  )

  return (
    <Result
      status="404"
      title="404"
      subTitle="Страница не найдена"
      extra={renderHomeBtn()}
    />
  )
}

export default NotFound