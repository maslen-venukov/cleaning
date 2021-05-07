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
import DatePicker from 'antd/lib/date-picker'

import getDateTime from '../../utils/getDateTime'
import emptyLocale from '../../utils/emptyLocale'

import { fetchBackCalls, setBackCalls, fetchRemoveBackCall, fetchProcessBackCall } from '../../store/actions/backCalls'

import { IBackCall } from '../../types/backCalls'
import { RootState } from '../../store/reducers'

interface IFormValues {
  name: string
  connection: string
  date: {
    _d: Date
  }
}

const BackCalls: React.FC = () => {
  const dispatch = useDispatch()

  const { token } = useSelector((state: RootState) => state.user)
  const { backCalls, isLoading } = useSelector((state: RootState) => state.backCalls)

  const [isDrawerVisible, setDrawerVisible] = useState<boolean>(false)

  const onDrawerOpen = () => setDrawerVisible(true)
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
    const data = {
      ...values,
      date: values.date._d.toJSON()
    }
    console.log(data)
  }

  return (
    <AdminLayout>
      <Table
        dataSource={backCalls}
        rowKey={(record: IBackCall) => record._id}
        locale={emptyLocale}
        loading={isLoading}
      >
        <Column title="Имя" dataIndex="name" key="name" />
        <Column title="Телефон" dataIndex="phone" key="phone" />
        <Column title="Дата" dataIndex="date" key="date" render={(value: string) => getDateTime(new Date(value))} />
        <Column
          title="Действия"
          key="action"
          render={(value, record: IBackCall) => (
            <Space size="small">
              <Button type="primary" onClick={onDrawerOpen}>Заказ</Button>
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
        <Form onFinish={onFormFinish}>
          <Form.Item
            label="Имя"
            name="name"
            rules={[{ required: true, message: 'Введите имя!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Телефон"
            name="connection"
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
