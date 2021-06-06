import React from 'react'
import Head from 'next/head'

import Header from '../components/Header'

import Layout from 'antd/lib/layout'

const { Content } = Layout

interface IMainLayoutProps {
  title?: string
  description?: string
  keywords?: string
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children, title, description, keywords }) => {
  return (
    <>
      <Head>
        <title>ООО "Энерго-Сервис" — клининговая компания{title ? ` — ${title}` : ''}</title>
        <meta name="description" content={description || 'Клининговая компания'} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={`клининг, уборка${keywords ? `, ${keywords}` : ''}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className="layout">
        <Header />
        <Content className="main">
          {children}
        </Content>
      </Layout>
    </>
  )
}

export default MainLayout