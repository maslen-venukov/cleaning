import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import message from 'antd/lib/message'
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined'
import DollarOutlined from '@ant-design/icons/DollarOutlined'
import LikeOutlined from '@ant-design/icons/LikeOutlined'
import PhoneOutlined from '@ant-design/icons/PhoneOutlined'

import { MenuInfo } from 'rc-menu/lib/interface'

interface IMenuItem {
  label: string
  href?: string
  key: string
  icon: any
}

const Header: React.FC = () => {
  const menu: IMenuItem[] = [
    { label: 'Главная', href: '/', key: 'home', icon: HomeOutlined },
    { label: 'О нас', href: '/about', key: 'about', icon: InfoCircleOutlined },
    { label: 'Услуги', href: '/services', key: 'services', icon: DollarOutlined },
    { label: 'Отзывы', href: '/reviews', key: 'reviews', icon: LikeOutlined },
    { label: 'Обратный звонок', key: 'back-call', icon: PhoneOutlined }
  ]

  const router = useRouter()

  const [current, setCurrent] = useState<string>('')
  const [isModalVisible, setModalVisible] = useState<boolean>(false)

  const [form] = Form.useForm()

  useEffect(() => {
    const page = router.pathname.toString().slice(1)
    setCurrent(page || 'home')
  }, [])

  const onMenuClick = (e: MenuInfo) => {
    if(e.key !== 'back-call') {
      return null
    }
    setModalVisible(true)
  }

  const onModalFormFinish = values => {
    console.log(values)
    message.success('Заявка успешно отправлена')
    form.resetFields()
    setModalVisible(false)
  }

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

      <Menu mode="horizontal" onClick={onMenuClick} selectedKeys={[current]}>
        {menu.map((item: IMenuItem) => (
            <Menu.Item key={item.key} icon={item.icon.render()}>
              {item.href ? (
                <Link href={item.href}>
                  <a>{item.label}</a>
                </Link>
              ) : (
                <>{item.label}</>
              )}
            </Menu.Item>
          ))}
      </Menu>

      <Modal
        title="Обратный звонок"
        visible={isModalVisible}
        footer={false}
        onCancel={() => setModalVisible(false)}
        className="header__modal"
      >
        <Form form={form} onFinish={onModalFormFinish}>
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: 'Введите ваше имя!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Телефон"
            rules={[{ required: true, message: 'Введите номер телефона!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item labelAlign="right">
            <Button type="primary" htmlType="submit">
              Заказать звонок
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout.Header>
  )
}

export default Header