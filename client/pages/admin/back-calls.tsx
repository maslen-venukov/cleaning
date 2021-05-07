import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminLayout from '../../layouts/AdminLayout'

import Table from 'antd/lib/table'
import Column from 'antd/lib/table/Column'
import Checkbox from 'antd/lib/checkbox/Checkbox'
import Drawer from 'antd/lib/drawer'
import Button from 'antd/lib/button'
import Space from 'antd/lib/space'
import Popconfirm from 'antd/lib/popconfirm'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
import InputNumber from 'antd/lib/input-number'
import DatePicker from 'antd/lib/date-picker'
import Select from 'antd/lib/select'
import Cascader from 'antd/lib/cascader'
import Spin from 'antd/lib/spin'
import MinusCircleOutlined from '@ant-design/icons/lib/icons/MinusCircleOutlined'
import PlusOutlined from '@ant-design/icons/lib/icons/PlusOutlined'

import getDateTime from '../../utils/getDateTime'
import emptyLocale from '../../utils/emptyLocale'

import { fetchBackCalls, setBackCalls, fetchRemoveBackCall, fetchProcessBackCall } from '../../store/actions/backCalls'
import { sendOrder } from '../../store/actions/orders'

import { RootState } from '../../store/reducers'
import { IBackCall } from '../../types/backCalls'
import { IOrder } from '../../types/orders'

interface IFormValues {
  name: string
  phone: string
  date: {
    _d: Date
  }
  main: string
  value: number
  additionals: { name: string[], value: number }[]
}

const BackCalls: React.FC = () => {
  const dispatch = useDispatch()

  const { token } = useSelector((state: RootState) => state.user)
  const { backCalls, isLoading: isBackCallsLoading } = useSelector((state: RootState) => state.backCalls)
  const { main, additional, isLoading: isServicesLoading } = useSelector((state: RootState) => state.services)

  const [form] = Form.useForm()

  const [isDrawerVisible, setDrawerVisible] = useState<boolean>(false)
  const [id, setId] = useState<string>('')

  const onDrawerOpen = (record: IBackCall) => {
    const { _id, name, phone } = record
    setId(_id)
    form.setFieldsValue({ name, phone })
    setDrawerVisible(true)
  }

  const onDrawerClose = () => setDrawerVisible(false)

  useEffect(() => {
    if(!token) {
      return null
    }
    dispatch(fetchBackCalls(token))
    return () => {
      dispatch(setBackCalls([]))
    }
  }, [token])

  const onRemove = (id: string) => dispatch(fetchRemoveBackCall(id, token))
  const onProcess = (id: string) => dispatch(fetchProcessBackCall(id, token))

  const onFormFinish = (values: IFormValues) => {
    const { name, phone: connection, value, additionals } = values

    const mainService = main.find(service => service._id === values.main)

    const additionalService = additionals ? additionals.map(service => {
      const options = additional.find(el => el._id === service.name[0]).options
      const { name, price, units } = options.find(el => el._id === service.name[1])
      const { value } = service
      return { name, price, units, value }
    }) : []

    const data: IOrder = {
      name,
      connection,
      date: new Date(values.date._d.toJSON()),
      services: {
        main: {
          name: mainService.name,
          price: mainService.price,
          units: mainService.units,
          value
        },
        additionals: additionalService
      }
    }

    sendOrder(data, token, () => {
      dispatch(fetchProcessBackCall(id, token))
      form.resetFields()
      onDrawerClose()
    })
  }

  return (
    <AdminLayout>
      <Table
        dataSource={backCalls}
        rowKey={(record: IBackCall) => record._id}
        locale={emptyLocale}
        loading={isBackCallsLoading}
      >
        <Column title="Имя" dataIndex="name" key="name" />
        <Column title="Телефон" dataIndex="phone" key="phone" />
        <Column title="Дата" dataIndex="date" key="date" render={(value: string) => getDateTime(new Date(value))} />
        <Column
          title="Действия"
          key="action"
          render={(_, record: IBackCall) => (
            <Space size="small">
              <Button type="primary" onClick={() => onDrawerOpen(record)}>Заказ</Button>
              <Popconfirm
                title="Вы действительно хотите удалить заявку?"
                okText="Да"
                cancelText="Нет"
                onConfirm={() => onRemove(record._id)}
              >
                <Button type="primary" danger>Удалить</Button>
              </Popconfirm>
            </Space>
          )}
        />
        <Column
          title="Обработан"
          dataIndex="isProcessed"
          key="isProcessed"
          render={(value: boolean, record: IBackCall) => (
            <Checkbox onChange={() => onProcess(record._id)} checked={value} />
          )}
        />
      </Table>

      <Drawer
        title="Создание заказа"
        placement="right"
        width={480}
        closable={false}
        onClose={onDrawerClose}
        visible={isDrawerVisible}
      >
        <Form form={form} onFinish={onFormFinish}>
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: 'Введите имя!' }]}
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
            <Select
              showSearch
              placeholder="Выберите услугу"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {!isServicesLoading ? (
                main.map(service => (
                  <Select.Option key={service._id} value={service._id}>{service.name}</Select.Option>
                ))
              ) : <Spin />}
            </Select>
          </Form.Item>

          <Form.Item
            label="Площадь"
            name="value"
            rules={[{ required: true, message: 'Введите площадь!' }]}
          >
            <InputNumber />
          </Form.Item>

          {!isServicesLoading ? (
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
              Создать
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </AdminLayout>
  )
}


export default BackCalls