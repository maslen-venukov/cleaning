import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined'
import FormatPainterOutlined from '@ant-design/icons/FormatPainterOutlined'
import DollarOutlined from '@ant-design/icons/DollarOutlined'

import { MenuInfo } from 'rc-menu/lib/interface'

const Header: React.FC = () => {
  const router = useRouter()

  const [current, setCurrent] = useState<string>('')

  useEffect(() => {
    const page = router.pathname.toString().slice(1)
    setCurrent(page || 'home')
  }, [])

  return (
    <Layout.Header className="header">
      <Link href="/">
        <a className="header__logo">
          <Image
            src="/logo.svg"
            alt="Логотип клининговой компании"
            width={50}
            height={50}
          />
        </a>
      </Link>
      <Menu mode="horizontal" selectedKeys={[current]}>
        <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link href="/">
            <a>Главная</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="about" icon={<InfoCircleOutlined />}>
          <Link href="/about">
            <a>О нас</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="services" icon={<FormatPainterOutlined />}>
          <Link href="/services">
            <a>Услуги</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="prices" icon={<DollarOutlined />}>
          <Link href="/prices">
            <a>Цены</a>
          </Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  )
}

export default Header