import React from 'react'
import { useSelector } from 'react-redux'

import Container from './Container'

import Cascader from 'antd/lib/cascader'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import InputNumber from 'antd/lib/input-number'
import Select from 'antd/lib/select'
import Space from 'antd/lib/space'
import Spin from 'antd/lib/spin'
import Typography from 'antd/lib/typography'
import Button from 'antd/lib/button'
import MinusCircleOutlined from '@ant-design/icons/lib/icons/MinusCircleOutlined'
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined'

import { sendCalcRequest } from '../store/actions/calcRequests'

import getPostData from '../utils/getPostData'

import { RootState } from '../store/reducers'

interface IFormValues {
  name: string
  email: string
  main: string
  value: number
  additionals: { name: string[], value: number }[]
}

const Calculator: React.FC = () => {
  const { main, additional, isLoading } = useSelector((state: RootState) => state.services)

  const [form] = Form.useForm()

  const onFinish = (values: IFormValues) => {
    const data = getPostData(values, main, additional)
    sendCalcRequest(data, form.resetFields)
  }

  return (
    <Container>
      <Typography.Title level={3}>Калькулятор клининговых услуг</Typography.Title>
      <Form form={form} onFinish={onFinish} className="calculator-form">
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Введите ваше имя!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Введите ваш email!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Вид уборки"
          name="main"
          rules={[{ required: true, message: 'Выберите вид уборки!' }]}
        >
          {!isLoading ? (
            <Select
              showSearch
              placeholder="Выберите услугу"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {main.map(service => (
                <Select.Option key={service._id} value={service._id}>{service.name}</Select.Option>
              ))}
            </Select>
          ) : <Spin />}
        </Form.Item>

        <Form.Item
          label="Площадь"
          name="value"
          rules={[{ required: true, message: 'Введите площадь!' }]}
        >
          <Input />
        </Form.Item>

        {!isLoading ? (
          <Form.List name="additionals">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex' }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      fieldKey={[fieldKey, 'name']}
                      rules={[{ required: true, message: 'Выберите услугу!' }]}
                    >
                      <Cascader
                        options={additional}
                        fieldNames={{ label: 'name', value: '_id', children: 'options' }}
                        placeholder="Выберите услугу"
                      />
                    </Form.Item>

                    <Form.Item
                      {...restField}
                      name={[name, 'value']}
                      fieldKey={[fieldKey, 'value']}
                      rules={[{ required: true, message: 'Введите количество!' }]}
                    >
                      <InputNumber placeholder="Количество" style={{ width: 160 }} />
                    </Form.Item>
                    <MinusCircleOutlined onClick={() => remove(name)} />
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Добавить дополнитульную услугу
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        ) : <Spin />}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Расчитать стоимость
          </Button>
        </Form.Item>
      </Form>
    </Container>
  )
}

export default Calculator