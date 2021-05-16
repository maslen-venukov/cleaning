import React from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'

import Row from 'antd/lib/row'
import Col from 'antd/lib/grid/col'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'

import { logIn } from '../store/actions/user'

interface ILoginFormValues {
  login: string
  password: string
}

const Login: React.FC = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const onFinish = (values: ILoginFormValues) => {
    const { login, password } = values
    const redirect = () => router.push('/admin')
    dispatch(logIn(login, password, redirect))
  }

  return (
    <Row justify="center" align="middle" className="login">
      <Col lg={8} md={12} sm={16} xs={20}>
        <Form onFinish={onFinish}>
          <Form.Item
            label="Логин"
            name="login"
            rules={[{ required: true, message: 'Введите логин!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Пароль"
            name="password"
            rules={[{ required: true, message: 'Введите пароль!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Login