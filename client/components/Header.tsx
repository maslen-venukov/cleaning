import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'

import { sendBackCall } from '../store/actions/backCalls'

import Layout from 'antd/lib/layout'
import Menu from 'antd/lib/menu'
import SubMenu from 'antd/lib/menu/SubMenu'
import Modal from 'antd/lib/modal'
import Form from 'antd/lib/form'
import Row from 'antd/lib/row'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'
import Spin from 'antd/lib/spin'
import HomeOutlined from '@ant-design/icons/HomeOutlined'
import InfoCircleOutlined from '@ant-design/icons/InfoCircleOutlined'
import DollarOutlined from '@ant-design/icons/DollarOutlined'
import LikeOutlined from '@ant-design/icons/LikeOutlined'
import PhoneOutlined from '@ant-design/icons/PhoneOutlined'

import { MenuInfo } from 'rc-menu/lib/interface'
import { RootState } from '../store/reducers'

interface IMenuItem {
  label: string
  href: string
  key: string
  icon: any
}

interface IModalFormValues {
  name: string
  phone: string
}

const Header: React.FC = () => {
  const menu: IMenuItem[] = [
    { label: 'Главная', href: '/', key: 'home', icon: HomeOutlined },
    { label: 'Отзывы', href: '/reviews', key: 'reviews', icon: LikeOutlined }
  ]

  const router = useRouter()

  const { main: services, isLoading } = useSelector((state: RootState) => state.services)

  const [current, setCurrent] = useState<string>('')
  const [isModalVisible, setModalVisible] = useState<boolean>(false)

  const [form] = Form.useForm()

  useEffect(() => {
    const page = router.asPath.slice(1)
    setCurrent(page || 'home')
  }, [])

  const onMenuClick = (e: MenuInfo) => {
    if(e.key !== 'back-call') {
      return null
    }
    setModalVisible(true)
  }

  const onFormFinish = (values: IModalFormValues) => {
    const { name, phone } = values
    sendBackCall(name, phone)
    form.resetFields()
    setModalVisible(false)
  }

  return (
    <Layout.Header className="header">
      <Link href="/">
        <a style={{ lineHeight: 1 }}>
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
            <Link href={item.href}>
              <a>{item.label}</a>
            </Link>
          </Menu.Item>
        ))}

        <SubMenu key="services" icon={<DollarOutlined />} title="Услуги">
          {!isLoading ? (
            services.map(service => (
              <Menu.Item key={`services/${service._id}`}>
                <Link href={`/services/${service._id}`}>
                  <a>{service.name}</a>
                </Link>
              </Menu.Item>
            ))
          ) : <Spin />}
        </SubMenu>

        <Menu.Item key={'back-call'} icon={<PhoneOutlined />}>
          Обратный звонок
        </Menu.Item>
      </Menu>

      <Modal
        title="Обратный звонок"
        visible={isModalVisible}
        footer={false}
        onCancel={() => setModalVisible(false)}
        className="header__modal"
      >
        <Form form={form} onFinish={onFormFinish} className="back-call-form">
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: 'Введите ваше имя!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Телефон"
            name="phone"
            rules={[{ required: true, message: 'Введите номер телефона!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Row justify="end">
              <Button type="primary" htmlType="submit">
                Заказать звонок
              </Button>
            </Row>
          </Form.Item>
        </Form>
      </Modal>
    </Layout.Header>
  )
}

export default Header