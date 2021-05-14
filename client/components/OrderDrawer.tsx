import React from 'react'

import Drawer, { DrawerProps } from 'antd/lib/drawer'
import Form, { FormProps } from 'antd/lib/form'
import Input from 'antd/lib/input'
import InputNumber from 'antd/lib/input-number'
import DatePicker from 'antd/lib/date-picker'
import Select from 'antd/lib/select'
import Cascader from 'antd/lib/cascader'
import Space from 'antd/lib/space'
import Button from 'antd/lib/button'
import Spin from 'antd/lib/spin'
import MinusCircleOutlined from '@ant-design/icons/lib/icons/MinusCircleOutlined'
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined'

import getContactStrings from '../utils/getContactsStrings'

import { IMainService, IAdditionalService } from '../types/services'

export interface IOrderDrawerConfig {
  phone?: boolean
  email?: boolean
  connection?: boolean
}

interface IOrderDrawerProps extends DrawerProps, FormProps {
  title: string
  submitText: string
  isLoading: boolean
  main: IMainService[]
  additional: IAdditionalService[]
  config?: IOrderDrawerConfig
}

const OrderDrawer: React.FC<IOrderDrawerProps> = ({ title, submitText, onClose, visible, form, onFinish, isLoading, main, additional, config }) => {
  const contact = getContactStrings(config)

  return (
    <Drawer
      title={title}
      placement="right"
      width={480}
      onClose={onClose}
      visible={visible}
    >
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="Имя"
          name="name"
          rules={[{ required: true, message: 'Введите имя!' }]}
        >
          <Input />
        </Form.Item>

        {config && (
          <Form.Item
            label={contact.label}
            name={contact.name}
            rules={[{ required: true, message: 'Введите номер телефона!' }]}
          >
            <Input />
          </Form.Item>
        )}

        <Form.Item
          label="Адрес"
          name="address"
          rules={[{ required: true, message: 'Введите адрес!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Дата"
          name="date"
          rules={[{ required: true, message: 'Введите назначенную дату!' }]}
        >
          <DatePicker showTime={{ format: 'HH:mm' }} format="YYYY-MM-DD HH:mm" />
        </Form.Item>

          <Form.Item
            label="Услуга"
            name="main"
            rules={[{ required: true, message: 'Выберите услугу!' }]}
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
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Комментарий"
          name="comment"
        >
          <Input.TextArea autoSize={{ minRows: 2 }} />
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
            {submitText}
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  )
}

export default OrderDrawer