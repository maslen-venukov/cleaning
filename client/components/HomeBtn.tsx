import React from 'react'

import Button from 'antd/lib/button'
import Link from 'next/link'

const HomeBtn: React.FC = () => {
  return (
    <Button type="primary">
      <Link href="/">
        <a>Перейти на главную</a>
      </Link>
    </Button>
  )
}

export default HomeBtn