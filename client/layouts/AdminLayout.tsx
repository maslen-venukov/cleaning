import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'

import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PhoneOutlined,
  CalculatorOutlined,
  PictureOutlined, LikeOutlined,
  SolutionOutlined }
from '@ant-design/icons'

import { RootState } from '../store/reducers'

const { Sider, Header, Content } = Layout

interface IAdminLayoutProps {
  children: React.ReactNode
}

interface IMenuItem {
  label: string
  href?: string
  key: string
  icon: any
}

const AdminLayout: React.FC<IAdminLayoutProps> = ({ children }) => {
  const menu: IMenuItem[] = [
    { label: 'Обратные звонки', href: '/admin/back-calls', key: 'back-calls', icon: PhoneOutlined },
    { label: 'Заявки (калькулятор)', href: '/admin/requests', key: 'requests', icon: CalculatorOutlined },
    { label: 'Заявки (фото)', href: '/admin/photo', key: 'photo', icon: PictureOutlined },
    { label: 'Отзывы', href: '/admin/reviews', key: 'reviews', icon: LikeOutlined },
    { label: 'Заказы', href: '/admin/orders', key: 'orders', icon: SolutionOutlined }
  ]

  const router = useRouter()

  const currentUser = useSelector((state: RootState) => state.user.currentUser)

  const [isCollapsed, setCollapsed] = useState<boolean>(false)
  const [current, setCurrent] = useState<string>('')

  useEffect(() => {
    const page = router.pathname.replace('/admin/', '')
    setCurrent(page)
  }, [])

  const onToggle = () => setCollapsed(!isCollapsed)

  return currentUser && (
    <>
      <Head>
        <title>Клининговая компания — Панель администратора</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className="layout">
        <Sider trigger={null} collapsible collapsed={isCollapsed}>
          <Menu theme="dark" mode="inline" selectedKeys={[current]}>
            {menu.map((item: IMenuItem) => (
              <Menu.Item key={item.key} icon={item.icon.render()}>
                <Link href={item.href}>
                  <a>{item.label}</a>
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ padding: '0 15px', backgroundColor: '#fff' }}>
            <button onClick={onToggle} className="btn-reset">
              {isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </button>
          </Header>
          <Content style={{ padding: 15 }}>{children}</Content>
        </Layout>
      </Layout>

    </>
  )
}

export default AdminLayout
