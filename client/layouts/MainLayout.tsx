import React from 'react'
import Head from 'next/head'

interface IMainLayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  keywords?: string
}

const MainLayout: React.FC<IMainLayoutProps> = ({ children, title, description, keywords }) => {
  return (
    <>
      <Head>
        <title>Клининговая компания{title ? ` — ${title}` : ''}</title>
        <meta name="description" content={description || 'Клининговая компания'} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={`клининг, уборка${keywords ? `, ${keywords}` : ''}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </>
  )
}

export default MainLayout