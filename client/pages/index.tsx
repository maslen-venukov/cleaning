import React from 'react'

import MainLayout from '../layouts/MainLayout'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Typography from 'antd/lib/typography'

const Home: React.FC = () => {
  return (
    <MainLayout>
      <Row align="middle" className="home">
        <Col span={24}>
          <Typography.Title>Клининговые услуги</Typography.Title>
          <Typography.Title level={2}>Доверьте уборку профессионалам</Typography.Title>
        </Col>
      </Row>
    </MainLayout>
  )
}

export default Home