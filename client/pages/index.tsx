import React from 'react'

import MainLayout from '../layouts/MainLayout'

import Intro from '../components/Intro'

const Home: React.FC = () => {
  return (
    <MainLayout>
      <Intro
        title="Клининговые услуги"
        subtitle="Доверьте уборку профессионалам"
        backgroundImage="intro.jpg"
      />
    </MainLayout>
  )
}

export default Home