import React from 'react'

import Row from 'antd/lib/row'
import Col from 'antd/lib/grid/col'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import Button from 'antd/lib/button'

// TODO доделать авторизацию на клиенте
// TODO сделать отображение backcalls

const Login: React.FC = () => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

  return (
    <Row justify="center" align="middle" className="login">
      <Col span={12}>
        <Form
        {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={() => ({})}
          onFinishFailed={() => ({})}
        >
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

          <Form.Item {...tailLayout}>
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