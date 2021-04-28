import React from 'react'

import MainLayout from '../layouts/MainLayout'

import Typography from 'antd/lib/typography'

const Home: React.FC = () => {
  return (
    <MainLayout>
      <section className="home">
        <Typography.Title className="home__title">Клининговые услуги</Typography.Title>
        <Typography.Title level={2}>Доверьте уборку профессионалам</Typography.Title>
      </section>
    </MainLayout>
  )
}

export default Home